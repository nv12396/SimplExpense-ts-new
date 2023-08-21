import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { TotalAmountService } from './total-amount.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

import { TotalAmountDTO } from './total-amount.dto';
import { TotalAmountDocument } from './total-amount.schema';

@Controller('total-amount')
export class TotalAmountController {
  constructor(private totalAmountService: TotalAmountService) {}

  @UseGuards(JwtGuard)
  @Get('')
  getTotalAmount(@Request() req): Promise<TotalAmountDocument> {
    const { id: user } = req.user;
    return this.totalAmountService.getTotalAmount(user);
  }

  @UseGuards(JwtGuard)
  @Post('/create')
  createTotalAmount(
    @Request() req,
    @Body('amount') amount: number,
  ): Promise<TotalAmountDTO> {
    console.log(req.user);
    const { id: user } = req.user;
    return this.totalAmountService.createTotalAmount(user, amount);
  }

  @UseGuards(JwtGuard)
  @Patch('/update/:id')
  updateTotalAmount(
    @Request() req,
    @Param('id') id,
    @Body('amount') amount: number,
  ): Promise<TotalAmountDTO> {
    const { id: user } = req.user;
    console.log('id je', req.user);
    return this.totalAmountService.updateTotalAmount(user, amount);
  }
}
