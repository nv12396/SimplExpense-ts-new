import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, SchemaTypes } from 'mongoose';

import { User } from 'src/user/user.schema';
import { Categories } from 'src/categories/categories.schema';

export type BudgetDocument = Budget & Document;

@Schema({ timestamps: true })
export class Budget {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  limit: number;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: Categories.name })
  category: Types.ObjectId;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: User.name })
  user: Types.ObjectId;
}

export const BudgetSchema = SchemaFactory.createForClass(Budget);
