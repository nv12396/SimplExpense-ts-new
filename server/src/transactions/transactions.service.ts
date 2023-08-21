import * as moment from 'moment';
import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, PipelineStage } from 'mongoose';

import { TransactionsDocument } from './transactions.schema';
import {
  TransactionsDTO,
  TransactionDetailsDTO,
  deleteTransactionDTO,
  SpendingsDTO,
  CharDataDTO,
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

  async findTopSpendings(userId: string): Promise<SpendingsDTO[]> {
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
          _id: '$category',
          total: { $sum: '$amount' },
        },
      },
      {
        $sort: {
          total: -1 as -1,
        },
      },
      {
        $limit: 3,
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: '$category',
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category._id',
          foreignField: '_id',
          as: 'categoryDetails',
        },
      },
      {
        $unwind: '$categoryDetails',
      },
      {
        $project: {
          total: 1,
          category: {
            _id: '$category._id',
            name: '$categoryDetails.name',
            icon: '$categoryDetails.icon',
          },
        },
      },
    ];
    const spendings = await this.transactionsModel.aggregate(pipeline).exec();

    return spendings;
  }

  async findAllTransactionsWithinDateRange(
    userId: string,
    startDateYear: number,
    startDateMonth: number,
    startDateDay: number,
    endDateYear: number,
    endDateMonth: number,
    endDateDay: number,
  ): Promise<TransactionDetailsDTO[]> {
    const startDate = new Date(startDateYear, startDateMonth, startDateDay);
    const endDate = new Date(endDateYear, endDateMonth, endDateDay);

    const transactions = await this.transactionsModel
      .find({
        user: userId,
        date: { $gte: startDate, $lt: endDate },
      })
      .populate('category')
      .sort({ date: -1 });

    return transactions.map((transaction) =>
      this.getTransactionDetails(transaction),
    );
  }

  async getChartData(userId: string): Promise<CharDataDTO[]> {
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 7);

    const pastSevenDays: Date[] = [...Array(7)]
      .map((_, i) => moment().subtract(i, 'days').startOf('day').toDate())
      .reverse();

    const user = new mongoose.Types.ObjectId(userId);
    const type = 'EXPENSE';
    const pipeline: PipelineStage[] = [
      {
        $match: {
          user,
          type,
          date: {
            $gte: pastDate,
            $lt: currentDate,
          },
        },
      },
      {
        $group: {
          _id: '$date',
          totalAmount: { $sum: '$amount' },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $limit: 7,
      },
    ];

    const chartData = await this.transactionsModel.aggregate(pipeline).exec();

    const result = pastSevenDays.map((date) => {
      const summaryForDate = chartData.find((summary) =>
        moment(summary._id).isSame(date, 'day'),
      );
      if (summaryForDate) {
        return summaryForDate;
      } else {
        return {
          _id: date,
          totalAmount: 0,
        };
      }
    });

    return result;
  }

  async createTransaction(
    transactions: TransactionsDTO,
    userId: string,
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
    userId: string,
  ): Promise<TransactionDetailsDTO> {
    const { id } = transactionsId;
    const { name, amount, type, category } = transaction;
    const date = new Date();
    const updatedTransaction = await this.transactionsModel.findByIdAndUpdate(
      id,
      {
        name,
        amount,
        type,
        user: userId,
        date,
        category,
      },
      { new: true },
    );
    return this.getTransactionDetails(updatedTransaction);
  }
}
