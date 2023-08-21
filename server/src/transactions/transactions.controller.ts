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

import {
  TransactionsDTO,
  TransactionDetailsDTO,
  SpendingsDTO,
  CharDataDTO,
} from './transactions.dto';
import { MongoIdDTO } from 'src/dtos/dtos';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @UseGuards(JwtGuard)
  @Get('/get-transactions/:sortBy')
  findAllTransactions(
    @Request() req,
    @Param('sortBy') sortBy: string,
  ): Promise<TransactionDetailsDTO[]> {
    const { id: userId } = req.user;
    return this.transactionsService.findAllTransactions(userId, sortBy);
  }

  @UseGuards(JwtGuard)
  @Get('/expenses/')
  findAllExpenses(@Request() req): Promise<number> {
    const { id: userId } = req.user;
    return this.transactionsService.findAllExpensesCurrentMonth(userId);
  }

  @UseGuards(JwtGuard)
  @Get('/chart-data/')
  getChartData(@Request() req): Promise<CharDataDTO[]> {
    const { id: userId } = req.user;
    return this.transactionsService.getChartData(userId);
  }

  @UseGuards(JwtGuard)
  @Get('/income/')
  findAllIncome(@Request() req): Promise<number> {
    const { id: userId } = req.user;
    return this.transactionsService.findAllIncomeCurrentMonth(userId);
  }

  @UseGuards(JwtGuard)
  @Get('/spendings/')
  findTopSpendings(@Request() req): Promise<SpendingsDTO[]> {
    const { id: userId } = req.user;
    return this.transactionsService.findTopSpendings(userId);
  }

  @UseGuards(JwtGuard)
  @Get(
    '/dateRange/:startDateYear/:startDateMonth/:startDateDay/:endDateYear/:endDateMonth/:endDateDay',
  )
  findAllTransactionsWithinDateRange(
    @Request() req,
    @Param('startDateYear') startDateYear: number,
    @Param('startDateMonth') startDateMonth: number,
    @Param('startDateDay') startDateDay: number,
    @Param('endDateYear') endDateYear: number,
    @Param('endDateMonth') endDateMonth: number,
    @Param('endDateDay') endDateDay: number,
  ): Promise<TransactionDetailsDTO[]> {
    const { id: userId } = req.user;
    return this.transactionsService.findAllTransactionsWithinDateRange(
      userId,
      startDateYear,
      startDateMonth,
      startDateDay,
      endDateYear,
      endDateMonth,
      endDateDay,
    );
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
  @Delete('/delete/:id/:amount/:type/:categoryId')
  deleteTransaction(
    @Param('id') id: MongoIdDTO,
    @Param('amount') amount: number,
    @Param('type') type: 'EXPENSE' | 'INCOME',
    @Param('categoryId') categoryId: MongoIdDTO,
    @Request() req,
  ): Promise<TransactionDetailsDTO> {
    const { id: userId } = req.user;
    return this.transactionsService.deleteTransaction({
      id,
      amount,
      categoryId,
      type,
      userId,
    });
  }

  @UseGuards(JwtGuard)
  @Patch('/update/:id')
  updateTransaction(
    @Request() req,
    @Param() id: MongoIdDTO,
    @Body() transaction: TransactionsDTO,
  ): Promise<TransactionDetailsDTO> {
    const { id: userId } = req.user;
    return this.transactionsService.updateTransaction(id, transaction, userId);
  }
}
