import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BudgetSchema } from './budget.schema';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { TransactionsSchema } from 'src/transactions/transactions.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Budget', schema: BudgetSchema },
      { name: 'Transactions', schema: TransactionsSchema },
    ]),
  ],
  controllers: [BudgetController],
  providers: [BudgetService],
  exports: [BudgetService],
})
export class BudgetModule {}
