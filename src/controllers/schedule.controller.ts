import { MetroService } from './../services/metro.service';
import { Controller, Get, Query, BadRequestException, Param } from '@nestjs/common';
import { STATIONS } from '../models/stations';
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
  getStationNameById(@Param() params) {
    const id = parseInt(params.id, 10);
    if (!id) {
      throw new BadRequestException(`Station is a number`);
    }
    if (!this.metroService.stationExist(id)) {
      throw new BadRequestException(`Not found station: ${params.id}`);
    }
    return { name: STATIONS[id], id };
  }

}
