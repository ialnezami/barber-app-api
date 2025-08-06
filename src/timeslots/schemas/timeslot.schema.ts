import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TimeSlotDocument = TimeSlot & Document;

@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc: any, ret: any) => {
      return {
        ...ret,
        id: ret._id?.toString?.() ?? ret._id,
        _id: undefined,
        __v: undefined,
      };
    },
  },
})
export class TimeSlot {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop({ default: false })
  isBooked: boolean;

  @Prop()
  bookedBy?: string;
}

export const TimeSlotSchema = SchemaFactory.createForClass(TimeSlot);
