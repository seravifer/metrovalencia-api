import { IsNotEmpty, IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsDate } from './customPipes/date.pipe';
import { IsHour } from './customPipes/hour.pipe';

export class ScheduleValidator {

  @IsNotEmpty()
  @Transform(value => Number.isNaN(+value) ? 0 : +value)
  @IsInt()
  from: number;

  @IsNotEmpty()
  @Transform(value => Number.isNaN(+value) ? 0 : +value)
  @IsInt()
  to: number;

  @IsOptional()
  @IsDate({ message: 'Invalid date' })
  date?: string;

  @IsOptional()
  @IsHour({ message: 'Invalid time' })
  iHour?: string;

  @IsOptional()
  @IsHour({ message: 'Invalid time' })
  fHour?: string;

}
