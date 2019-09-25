import { Module, HttpModule } from '@nestjs/common';
import { ScheduleController } from './controllers/schedule.controller';
import { MetroService } from './services/metro.service';

@Module({
  imports: [HttpModule],
  controllers: [ScheduleController],
  providers: [MetroService],
})
export class AppModule {}
