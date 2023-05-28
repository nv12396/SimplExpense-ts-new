import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TransactionsDocument } from './transactions.schema';
import { TransactionsDTO, TransactionDetailsDTO } from './transactions.dto';
import { MongoIdDTO } from 'src/dtos/dtos';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel('Transactions')
    private transactionsModel: Model<TransactionsDocument>,
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
  ): Promise<TransactionDetailsDTO[]> {
    const transactions = await this.transactionsModel
      .find({ user: userId })
      .populate('category')
      .exec();
    return transactions.map((transaction) =>
      this.getTransactionDetails(transaction),
    );
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
    return await newTransaction.save();
  }

  async deleteTransaction(
    transactionId: MongoIdDTO,
  ): Promise<TransactionDetailsDTO> {
    const { id } = transactionId;
    const transactionCategory = await this.transactionsModel.findByIdAndDelete(
      id,
    );
    return this.getTransactionDetails(transactionCategory);
  }

  async updateTransaction(
    transactionsId: MongoIdDTO,
    transaction: TransactionsDTO,
  ): Promise<TransactionDetailsDTO> {
    const { id } = transactionsId;
    const { name, amount, type, user, category } = transaction;
    const updatedTransaction = await this.transactionsModel.findByIdAndUpdate(
      id,
      {
        name,
        amount,
        type,
        user,
        category,
      },
      { new: true },
    );
    return this.getTransactionDetails(updatedTransaction);
  }
}
