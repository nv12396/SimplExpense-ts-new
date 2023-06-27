import { MongoIdDTO } from 'src/dtos/dtos';
import { Date, Types } from 'mongoose';
import { IsEnum } from 'class-validator';

export class TransactionsDTO {
  name: string;
  amount: number;
  category: MongoIdDTO;
  user: MongoIdDTO;
  type: 'EXPENSE' | 'INCOME';
  date: Date;
}

export class TransactionDetailsDTO {
  id: MongoIdDTO;
  name: string;
  amount: number;
  category: Types.ObjectId;
  user: Types.ObjectId;
  type: 'EXPENSE' | 'INCOME';
  date: Date;
}

export class TransactionSortDTO {
  sortOptions: 'highestAmount' | 'lowestAmount' | 'newest' | 'oldest' =
    'newest';
}

export class deleteTransactionDTO {
  id: MongoIdDTO;
  amount: number;
  categoryId: MongoIdDTO;
  type: 'INCOME' | 'EXPENSE';
  userId?: MongoIdDTO;
}
