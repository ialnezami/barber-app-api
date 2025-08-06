import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class TimeSlot extends Document {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  barberId: Types.ObjectId;

  @Prop({ default: false })
  isBooked: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Appointment' })
  appointmentId: Types.ObjectId;

  @Prop({ default: true })
  isAvailable: boolean;
}

export const TimeSlotSchema = SchemaFactory.createForClass(TimeSlot);
