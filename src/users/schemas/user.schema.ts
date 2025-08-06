import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../common/enums/role.enum';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc: any, ret: any) => {
      // Add id field from _id
      (ret as any).id = ret._id;
      // Remove _id if present
      if ('_id' in ret) {
        delete (ret as any)._id;
      }
      // Remove __v if present
      if ('__v' in ret) {
        delete (ret as any).__v;
      }
      // Remove password if present
      if ('password' in ret) {
        delete (ret as any).password;
      }
      return ret;
    },
  },
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: Role, default: Role.CUSTOMER })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);