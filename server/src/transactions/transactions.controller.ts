import { Controller } from '@nestjs/common';
import {
  Post,
  Body,
  Delete,
  Param,
  Get,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';

import { TransactionsService } from './transactions.service';
import { TransactionsDocument } from './transactions.schema';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

import { TransactionsDTO, TransactionDetailsDTO } from './transactions.dto';
import { MongoIdDTO } from 'src/dtos/dtos';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @UseGuards(JwtGuard)
  @Get('/')
  findAllTransactions(@Request() req): Promise<TransactionDetailsDTO[]> {
    const { id: userId } = req.user;
    return this.transactionsService.findAllTransactions(userId);
  }

  @UseGuards(JwtGuard)
  @Post('/create')
  createTransaction(
    @Request() req,
    @Body() transaction: TransactionsDTO,
  ): Promise<TransactionsDocument> {
    const { id: userId } = req.user;
    return this.transactionsService.createTransaction(transaction, userId);
  }

  @UseGuards(JwtGuard)
  @Delete('/delete/:id')
  deleteTransaction(@Param() id: MongoIdDTO): Promise<TransactionDetailsDTO> {
    return this.transactionsService.deleteTransaction(id);
  }

  @UseGuards(JwtGuard)
  @Patch('/update/:id')
  updateTransaction(
    @Param() id: MongoIdDTO,
    @Body() transaction: TransactionsDTO,
  ): Promise<TransactionDetailsDTO> {
    return this.transactionsService.updateTransaction(id, transaction);
  }
}
