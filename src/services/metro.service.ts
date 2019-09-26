import { Injectable, HttpService } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as qs from 'querystring';
import * as moment from 'moment';

@Injectable()
export class MetroService {

  constructor(private httpService: HttpService) { }

  getRoute(
    from: string,
    to: string,
    date: string = moment().format('dd/MM/yyyy'),
    timeInit: string = '00:00',
    timeEnd: string = '23:59') {
    const data = {
      origen: from,
      destino: to,
      fecha: date,
      hini: timeInit,
      hfin: timeEnd,
      calcular: 1,
      res: 0,
      key: 0
    };
    return new Promise((resolve, reject) => {
      this.httpService.post<string>(
        'https://www.metrovalencia.es/horarios.mobi.php',
        qs.stringify(data),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      ).subscribe(res => {
        const $ = cheerio.load(res.data);
        const info = $('li');
        resolve({
          zones: info.eq(5).text().substring(66, 69),
          routeTime: info.eq(4).text().substring(34, 50),
          schedule: this.parseSchedule($)
        });
      }, err => reject(err));
    });
  }

  private parseSchedule($: CheerioStatic) {
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
