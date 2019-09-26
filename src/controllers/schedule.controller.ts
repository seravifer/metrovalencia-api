import { MetroService } from './../services/metro.service';
import { Controller, Get, Query } from '@nestjs/common';
import { STATIONS } from '../models/stations';

@Controller()
export class ScheduleController {

  constructor(private metroService: MetroService) { }

  @Get('/schedule')
  getSchedule(@Query() params: { from: string, to: string, date?: string }) {
    return this.metroService.getRoute(params.from, params.to, params.date);
  }

  @Get('/stations')
  getAllStations() {
    return STATIONS;
  }

}
