import { MongoIdDTO } from 'src/dtos/dtos';
import { Types } from 'mongoose';

export class BudgetDTO {
  id?: MongoIdDTO;
  name: string;
  amount?: number;
  limit: number;
  category: Types.ObjectId;
}

export class AddBudgetDTO {
  name: string;
  limit: number;
  category: Types.ObjectId;
}

export class UpdateBudgetCurrentAmountDTO {
  amount: number;
  categoryId: MongoIdDTO;
  type: 'EXPENSE' | 'INCOME';
}
