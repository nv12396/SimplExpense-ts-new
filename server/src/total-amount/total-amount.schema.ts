import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, SchemaTypes } from 'mongoose';

import { User } from 'src/user/user.schema';

export type TotalAmountDocument = TotalAmount & Document;

@Schema({ timestamps: true })
export class TotalAmount {
  @Prop({ required: true })
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

TotalAmountSchema.pre('save', function (next) {
  if (this.isModified('amount') && this.amount < 0) {
    this.amount = 0;
  }
  next();
});
