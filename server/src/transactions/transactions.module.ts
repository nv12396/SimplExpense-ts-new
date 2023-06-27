import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from 'src/user/user.module';
import { TransactionsSchema } from './transactions.schema';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { BudgetModule } from 'src/budget/budget.module';
import { TotalAmountModule } from 'src/total-amount/total-amount.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Transactions', schema: TransactionsSchema },
    ]),
    UserModule,
    BudgetModule,
    TotalAmountModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
