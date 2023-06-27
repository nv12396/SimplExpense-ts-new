import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { TransactionsDocument } from './transactions.schema';
import {
  TransactionsDTO,
  TransactionDetailsDTO,
  deleteTransactionDTO,
} from './transactions.dto';
import { MongoIdDTO } from 'src/dtos/dtos';
import { BudgetService } from 'src/budget/budget.service';
import { TotalAmountService } from 'src/total-amount/total-amount.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel('Transactions')
    private transactionsModel: Model<TransactionsDocument>,
    private budgetService: BudgetService,
    private totalAmountService: TotalAmountService,
  ) {}

  getTransactionDetails(
    transaction: TransactionsDocument,
  ): TransactionDetailsDTO {
    return {
      amount: transaction.amount,
      name: transaction.name,
      id: transaction._id,
      type: transaction.type,
      category: transaction.category,
      user: transaction.user,
      date: transaction.date,
    };
  }

  async findTransactionsById(id: MongoIdDTO): Promise<TransactionDetailsDTO> {
    const transactions = await this.transactionsModel.findById(id);
    return this.getTransactionDetails(transactions);
  }

  async findAllTransactions(
    userId: MongoIdDTO,
    sortBy: string,
  ): Promise<TransactionDetailsDTO[]> {
    let sortOptions = {};
    if (sortBy === 'highestAmount') {
      sortOptions = { amount: -1 };
    } else if (sortBy === 'lowestAmount') {
      sortOptions = { amount: 1 };
    } else if (sortBy === 'oldest') {
      sortOptions = { date: 1 };
    } else if (sortBy === 'newest') {
      sortOptions = { date: -1 };
    }

    const transactions = await this.transactionsModel
      .find({ user: userId })
      .populate('category')
      .sort(sortOptions);
    return transactions.map((transaction) =>
      this.getTransactionDetails(transaction),
    );
  }

  async findAllExpensesCurrentMonth(userId: string): Promise<number> {
    const type = 'EXPENSE';
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const user = new mongoose.Types.ObjectId(userId);

    const pipeline = [
      {
        $match: {
          user,
          type,
          date: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ];
    const expenses = await this.transactionsModel.aggregate(pipeline).exec();
    return expenses[0]?.total;
  }
  async findAllIncomeCurrentMonth(userId: string): Promise<number> {
    const type = 'INCOME';
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const user = new mongoose.Types.ObjectId(userId);

    const pipeline = [
      {
        $match: {
          user,
          type,
          date: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ];
    const incomes = await this.transactionsModel.aggregate(pipeline).exec();
    return incomes[0]?.total;
  }

  async createTransaction(
    transactions: TransactionsDTO,
    userId,
  ): Promise<TransactionsDocument> {
    const { name, amount, category, type, date } = transactions;
    const newTransaction = await this.transactionsModel.create({
      name,
      amount,
      category,
      user: userId,
      type,
      date,
    });
    const updatedBudget = await this.budgetService.updateBudgetCurrentAmount({
      amount,
      categoryId: category,
      type,
    });
    return await newTransaction.save();
  }

  async deleteTransaction({
    id,
    amount,
    categoryId,
    type,
    userId,
  }: deleteTransactionDTO): Promise<TransactionDetailsDTO> {
    const amountToDetract = type === 'EXPENSE' ? amount : -+amount;
    const transactionCategory = await this.transactionsModel.findByIdAndDelete(
      id,
    );
    const updatedBudget = await this.budgetService.updateBudgetCurrentAmount({
      amount: -+amount,
      categoryId,
      type,
    });
    const deletedAmount =
      await this.totalAmountService.updateTotalAmountOnTransactionDelete(
        userId,
        amountToDetract,
      );

    return this.getTransactionDetails(transactionCategory);
  }

  async updateTransaction(
    transactionsId: MongoIdDTO,
    transaction: TransactionsDTO,
  ): Promise<TransactionDetailsDTO> {
    const { id } = transactionsId;
    const { name, amount, type, user, category } = transaction;
    const date = new Date();
    const updatedTransaction = await this.transactionsModel.findByIdAndUpdate(
      id,
      {
        name,
        amount,
        type,
        user,
        date,
        category,
      },
      { new: true },
    );
    return this.getTransactionDetails(updatedTransaction);
  }
}
