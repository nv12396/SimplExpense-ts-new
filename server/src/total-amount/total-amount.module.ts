import { Module } from '@nestjs/common';

import { TotalAmountController } from './total-amount.controller';
import { TotalAmountService } from './total-amount.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TotalAmountSchema } from './total-amount.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'TotalAmount', schema: TotalAmountSchema },
    ]),
    // UserModule,
  ],
  controllers: [TotalAmountController],
  providers: [TotalAmountService],
  exports: [TotalAmountService],
})
export class TotalAmountModule {}
