import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types, SchemaTypes } from 'mongoose';
import { User } from 'src/user/user.schema';
import { Categories } from 'src/categories/categories.schema';

export type TransactionsDocument = Transactions & Document;

enum TransactionType {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
}

@Schema({ timestamps: true })
export class Transactions {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: Categories.name })
  category: Types.ObjectId;

  @Prop({ default: TransactionType.EXPENSE })
  type: TransactionType;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: User.name })
  user: Types.ObjectId;
}

export const TransactionsSchema = SchemaFactory.createForClass(Transactions);
