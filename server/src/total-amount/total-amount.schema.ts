import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, SchemaTypes } from 'mongoose';

import { User } from 'src/user/user.schema';

export type TotalAmountDocument = TotalAmount & Document;

@Schema({ timestamps: true })
export class TotalAmount {
  @Prop({ required: true, default: 0, min: 0 })
  amount: number;

  @Prop({
    required: true,
    unique: true,
    type: SchemaTypes.ObjectId,
    ref: User.name,
  })
  user: Types.ObjectId;
}

export const TotalAmountSchema = SchemaFactory.createForClass(TotalAmount);
