import { Injectable, HttpService } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as qs from 'querystring';

@Injectable()
export class MetroService {

  constructor(private httpService: HttpService) { }

  getRoute(
    from: string,
    to: string,
    date: string,
    timeInit: string = '00:00',
    timeEnd: string = '23:59') {
    const data = {
      origen: from,
      res: 0,
      key: 0,
      destino: to,
      fecha: date,
      hini: timeInit,
      hfin: timeEnd,
      calcular: 1
    };
    return new Promise((resolve, reject) => {
      this.httpService.post<string>(
        'https://www.metrovalencia.es/horarios.mobi.php',
        qs.stringify(data),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      ).subscribe(res => {
        resolve(this.parseRoute(res.data));
      }, err => reject(err));
    });
  }

  parseRoute(html: string) {
    const $ = cheerio.load(html);
    const listTimes = [];
    $('table').find('tr').each((i, el) => {
      $(el).find('td').each((j, cell) => {
        const text = $(cell).text();
        if (j !== 0 && text !== '---') {
          listTimes.push(text);
        }
      });
    });
    return listTimes;
  }
}
