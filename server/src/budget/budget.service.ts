import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { BudgetDocument } from './budget.schema';
import {
  AddBudgetDTO,
  BudgetDTO,
  UpdateBudgetCurrentAmountDTO,
} from './budget.dtos';
import { MongoIdDTO } from 'src/dtos/dtos';
import { TransactionsDocument } from 'src/transactions/transactions.schema';

@Injectable()
export class BudgetService {
  constructor(
    @InjectModel('Budget') private budgetModel: Model<BudgetDocument>,
    @InjectModel('Transactions')
    private transactionsModel: Model<TransactionsDocument>,
  ) {}

  getBudgetDetails(budget: BudgetDocument): BudgetDTO {
    return {
      id: budget.id,
      name: budget.name,
      amount: budget.amount,
      limit: budget.limit,
      category: budget.category,
    };
  }

  async findBudgetById(id: MongoIdDTO): Promise<BudgetDTO> {
    const budget = await this.budgetModel.findById(id);
    return this.getBudgetDetails(budget);
  }

  async findAllBudgets(userId: MongoIdDTO): Promise<BudgetDTO[]> {
    const budget = await this.budgetModel
      .find({ user: userId })
      .populate('category')
      .exec();
    return budget.map((budget) => this.getBudgetDetails(budget));
  }

  async createBudget(budget: AddBudgetDTO, userId: string): Promise<BudgetDTO> {
    const { name, limit, category } = budget;

    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const user = new mongoose.Types.ObjectId(userId);
    const catId = new mongoose.Types.ObjectId(category);

    const pipeline = [
      {
        $match: {
          category: catId,
          user,
          date: { $gte: startDate, $lt: endDate },
        },
      },
      { $unwind: '$category' },
      {
        $group: {
          _id: '$category',
          currentAmount: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ];

    const transactionCursor = await this.transactionsModel
      .aggregate(pipeline)
      .exec();

    const newBudget = await this.budgetModel.create({
      name,
      category,
      limit,
      amount: transactionCursor[0]?.currentAmount || 0,
      user: userId,
    });
    return await newBudget.save();
  }

  async updateBudget(
    budgetId: MongoIdDTO,
    limit: number,
    category: MongoIdDTO,
  ): Promise<BudgetDTO> {
    const updatedBudget = await this.budgetModel.findByIdAndUpdate(
      budgetId,
      {
        limit,
        category,
      },
      { new: true },
    );
    return updatedBudget;
  }

  async updateBudgetCurrentAmount({
    amount,
    categoryId,
    type,
  }: UpdateBudgetCurrentAmountDTO): Promise<BudgetDTO> {
    if (type === 'EXPENSE') {
      const updatedBudget = await this.budgetModel.findOneAndUpdate(
        {
          category: categoryId,
        },
        {
          $inc: {
            amount,
          },
        },
        { new: true },
      );
      return updatedBudget;
    } else {
      return;
    }
  }

  async deleteBudget(budgetId: MongoIdDTO): Promise<BudgetDTO> {
    const deletedBudget = await this.budgetModel.findByIdAndDelete(budgetId);
    return this.getBudgetDetails(deletedBudget);
  }
}
