import { Injectable, HttpService } from '@nestjs/common';
import { getStationByName } from '../models/stations';
import * as cheerio from 'cheerio';
import * as qs from 'querystring';
import * as moment from 'moment';

@Injectable()
export class MetroService {

  constructor(private httpService: HttpService) { }

  getRoute(
    from: number,
    to: number,
    date: string = moment().format('dd/MM/yyyy'),
    iHour: string = '00:00',
    fHour: string = '23:59') {
    const data = {
      origen: from,
      destino: to,
      fecha: date,
      hini: iHour,
      hfin: fHour,
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
          from, to, date, iHour, fHour,
          zones: info.eq(5).text().substring(69).split(''),
          duration: info.eq(4).text().substring(33).replace(/\D/g, ''),
          journey: this.parseJourneys($)
        });
      }, err => reject(err));
    });
  }

  private parseJourneys($: CheerioStatic) {
    const listJourneys = [];
    $('table').each((tId, table) => {
      const stations = $(table).prevAll('span').eq(0).text().substring(11, 90).split(' a ').map(e => e.trim());
      const journay = {
        trains: $(table).prev('h3').text().split(':')[1].split(',').map(e => e.trim()),
        from: getStationByName(stations[0]),
        to: getStationByName(stations[1]),
        hours: []
      };
      $(table).find('tr').each((trId, tr) => {
        $(tr).find('td').each((cellId, cell) => {
          const hour = $(cell).text();
          if (cellId !== 0 && hour !== '---') {
            journay.hours.push(hour);
          }
        });
      });
      listJourneys.push(journay);
    });
    return listJourneys;
  }

}
