import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleController } from './schedule.controller';
import { MetroService } from '../services/metro.service';

describe('AppController', () => {
  let appController: ScheduleController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleController],
      providers: [MetroService],
    }).compile();

    appController = app.get<ScheduleController>(ScheduleController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
