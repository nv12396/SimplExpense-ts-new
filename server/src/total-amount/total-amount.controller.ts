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

@Controller('total-amount')
export class TotalAmountController {
  constructor(private totalAmountService: TotalAmountService) {}

  @UseGuards(JwtGuard)
  @Get('')
  getTotalAmount(@Request() req): Promise<TotalAmountDTO> {
    const { id: user } = req.user;
    return this.totalAmountService.getTotalAmount(user);
  }

  @UseGuards(JwtGuard)
  @Post('/create')
  createTotalAmount(
    @Request() req,
    @Body('amount') amount: number,
  ): Promise<TotalAmountDTO> {
    const { id: user } = req.user;
    return this.totalAmountService.createTotalAmount(user, amount);
  }

  @UseGuards(JwtGuard)
  @Patch('/update/:id')
  updateTotalAmount(
    @Param('id') id,
    @Body('amount') amount: number,
  ): Promise<TotalAmountDTO> {
    return this.totalAmountService.updateTotalAmount(id, amount);
  }
}
