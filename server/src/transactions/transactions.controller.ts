import { Controller } from '@nestjs/common';
import { Post, Body, Delete, Param, Get, Patch } from '@nestjs/common';

import { TransactionsService } from './transactions.service';
import { TransactionsDocument } from './transactions.schema';
import { TransactionsDTO, TransactionDetailsDTO } from './transactions.dto';
import { MongoIdDTO } from 'src/dtos/dtos';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}
  @Get('/')
  findAllTransactions(): Promise<TransactionDetailsDTO[]> {
    return this.transactionsService.findAllTransactions();
  }

  @Post('/create')
  createTransaction(
    @Body() transaction: TransactionsDTO,
  ): Promise<TransactionsDocument> {
    return this.transactionsService.createTransaction(transaction);
  }

  @Delete('/delete/:id')
  deleteTransaction(@Param() id: MongoIdDTO): Promise<TransactionDetailsDTO> {
    return this.transactionsService.deleteTransaction(id);
  }

  @Patch('/update/:id')
  updateTransaction(
    @Param() id: MongoIdDTO,
    @Body() transaction: TransactionsDTO,
  ): Promise<TransactionDetailsDTO> {
    return this.transactionsService.updateTransaction(id, transaction);
  }
}
