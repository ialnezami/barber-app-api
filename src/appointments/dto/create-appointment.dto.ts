import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({ example: '2025-08-07T10:00:00Z' })
  @IsDateString()
  date: string;
}