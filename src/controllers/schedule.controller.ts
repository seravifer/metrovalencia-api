import { MetroService } from './../services/metro.service';
import { Controller, Get, Query, BadRequestException, Param, NotImplementedException } from '@nestjs/common';
import { STATIONS, stationExist } from '../models/stations';
import { ScheduleValidator } from '../validatos/schedule.validator';

@Controller()
export class ScheduleController {

  constructor(private metroService: MetroService) { }

  @Get('/schedule')
  getSchedule(@Query() params: ScheduleValidator) {
    return this.metroService.getRoute(params.from, params.to, params.date, params.iHour, params.fHour);
  }

  @Get('/stations')
  getAllStations() {
    return STATIONS;
  }

  @Get('/stations/:id')
  getStationNameById(@Param('id') id) {
    if (!stationExist(id)) {
      throw new BadRequestException(`Not found station: ${id}`);
    }
    return { name: STATIONS[id], id };
  }

  @Get('/balance')
  getBalance(@Query('cardNumber') cardNumber) {
    return new NotImplementedException();
  }

}
