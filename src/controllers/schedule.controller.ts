import { MetroService } from './../services/metro.service';
import { Controller, Get, HttpService, Query } from '@nestjs/common';

@Controller()
export class ScheduleController {

  constructor(private metroService: MetroService) { }

  @Get('/route')
  getSchedule(@Query() params) {
    return this.metroService.getRoute(params.from, params.to, params.date);
  }
}
