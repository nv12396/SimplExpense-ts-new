import { MongoIdDTO } from 'src/dtos/dtos';
import { Types } from 'mongoose';

export class TransactionsDTO {
  name: string;
  amount: number;
  category: MongoIdDTO;
  user: MongoIdDTO;
  type: 'EXPENSE' | 'INCOME';
}

export class TransactionDetailsDTO {
  id: MongoIdDTO;
  name: string;
  amount: number;
  category: Types.ObjectId;
  user: Types.ObjectId;
  type: 'EXPENSE' | 'INCOME';
}
