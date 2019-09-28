import { MetroService } from './../services/metro.service';
import { Controller, Get, Query, BadRequestException, Param } from '@nestjs/common';
import { STATIONS } from '../models/stations';
import * as moment from 'moment';

@Controller()
export class ScheduleController {

  constructor(private metroService: MetroService) { }

  @Get('/schedule')
  getSchedule(@Query() params: { from: string, to: string, date?: string, iHour: string, fHour: string }) {
    if (!params || !params.from || !params.to) {
      throw new BadRequestException(`Params 'from' an 'to' are required`);
    }
    if (!this.metroService.stationExist(parseInt(params.from, 10))) {
      throw new BadRequestException(`Not found station: ${params.from}`);
    }
    if (!this.metroService.stationExist(parseInt(params.to, 10))) {
      throw new BadRequestException(`Not found station: ${params.to}`);
    }
    if (params.date && !moment(params.date, 'DD-MM-YYYY').isValid()) {
      throw new BadRequestException(`Invalid date`);
    }
    if ((params.iHour && !moment(params.iHour, 'HH:mm').isValid()) || (params.fHour && !moment(params.fHour, 'HH:mm').isValid())) {
      throw new BadRequestException(`Invalid time`);
    }
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
