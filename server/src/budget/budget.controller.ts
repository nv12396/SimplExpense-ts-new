import { MongoIdDTO } from 'src/dtos/dtos';
import { Controller, Delete, Patch } from '@nestjs/common';
import { Post, Body, Param, Get, UseGuards, Request } from '@nestjs/common';

import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { BudgetService } from './budget.service';
import { BudgetDTO } from './budget.dtos';

@Controller('budget')
export class BudgetController {
  constructor(private budgetService: BudgetService) {}

  @UseGuards(JwtGuard)
  @Get('/')
  findAllBudget(@Request() req): Promise<BudgetDTO[]> {
    const { id: userId } = req.user;
    return this.budgetService.findAllBudgets(userId);
  }

  @UseGuards(JwtGuard)
  @Get('/:id')
  findBudgetById(@Param() id: MongoIdDTO): Promise<BudgetDTO> {
    return this.budgetService.findBudgetById(id);
  }

  @UseGuards(JwtGuard)
  @Post('/create')
  createBudget(@Request() req, @Body() budget: BudgetDTO) {
    const { id: userId } = req.user;
    return this.budgetService.createBudget(budget, userId);
  }

  @UseGuards(JwtGuard)
  @Patch('/update/:id')
  updateBudget(@Body('limit') limit: number, @Param('id') budgetId) {
    return this.budgetService.updateBudget(budgetId, limit);
  }

  @UseGuards(JwtGuard)
  @Delete('/delete/:id')
  deleteBudget(@Param('id') budgetId) {
    return this.budgetService.deleteBudget(budgetId);
  }
}
