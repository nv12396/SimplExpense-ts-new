import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TotalAmountDocument } from './total-amount.schema';

import { TotalAmountDTO } from './total-amount.dto';
import { MongoIdDTO } from 'src/dtos/dtos';

@Injectable()
export class TotalAmountService {
  constructor(
    @InjectModel('TotalAmount')
    private totalAmountModel: Model<TotalAmountDocument>,
  ) {}

  getTotalAmountDetails(totalAmount: TotalAmountDocument): TotalAmountDTO {
    return {
      id: totalAmount._id,
      amount: totalAmount.amount,
    };
  }
  async getTotalAmount(user: MongoIdDTO): Promise<TotalAmountDocument> {
    const totalAmount = await this.totalAmountModel.findOne({ user });
    return totalAmount;
  }

  async createTotalAmount(
    user: MongoIdDTO,
    amount: number,
  ): Promise<TotalAmountDTO> {
    const totalAmount = await this.totalAmountModel.create({
      amount,
      user,
    });
    return this.getTotalAmountDetails(totalAmount);
  }

  async updateTotalAmount(
    user: MongoIdDTO,
    amount: number,
  ): Promise<TotalAmountDTO> {
    const totalAmount = await this.totalAmountModel.findOneAndUpdate(
      { user },
      {
        amount,
      },
      { new: true },
    );
    return this.getTotalAmountDetails(totalAmount);
  }

  async updateTotalAmountOnTransactionDelete(
    userId: MongoIdDTO,
    amount: number,
  ): Promise<TotalAmountDocument> {
    const totalAmount = await this.totalAmountModel.findOneAndUpdate(
      {
        user: userId,
      },
      {
        $inc: {
          amount,
        },
      },
      { new: true },
    );
    return totalAmount;
  }
}
