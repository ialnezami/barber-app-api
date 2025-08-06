import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeslotsService } from './timeslots.service';
import { TimeslotsController } from './timeslots.controller';
import { TimeSlot, TimeSlotSchema } from './schemas/timeslot.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: TimeSlot.name, schema: TimeSlotSchema }])],
  providers: [TimeslotsService],
  controllers: [TimeslotsController],
  exports: [TimeslotsService],
})
export class TimeslotsModule {}