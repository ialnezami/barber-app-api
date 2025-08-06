import { Module } from '@nestjs/common';
import { TimeslotsService } from './timeslots.service';
import { TimeslotsController } from './timeslots.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TimeslotsController],
  providers: [TimeslotsService, PrismaService],
})
export class TimeslotsModule {}