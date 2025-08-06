import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type AppointmentDocument = Appointment & Document;

@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc: any, ret: any) => {
      ret.id = ret._id?.toString?.() ?? ret._id;
      if ('_id' in ret) delete ret._id;
      if ('__v' in ret) delete ret.__v;
      return ret;
    },
  },
  },
)
export class Appointment {
  @Prop({ required: true })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ default: 'pending' })
  status: string;

  @Prop()
  notes?: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
