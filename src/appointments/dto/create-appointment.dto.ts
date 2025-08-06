import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({ example: '2025-08-07T10:00:00Z' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: 'Haircut and beard trim', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}