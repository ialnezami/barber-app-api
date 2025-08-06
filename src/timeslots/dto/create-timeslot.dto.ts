import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class CreateTimeslotDto {
  @ApiProperty({ example: '2025-08-07' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: '2025-08-07T09:00:00Z' })
  @IsDateString()
  startTime: string;

  @ApiProperty({ example: '2025-08-07T10:00:00Z' })
  @IsDateString()
  endTime: string;
}