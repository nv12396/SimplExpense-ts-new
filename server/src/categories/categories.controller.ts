import { Controller } from '@nestjs/common';
import {
  Post,
  Body,
  Delete,
  Param,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { CategoriesDocument } from './categories.schema';
import { CategoriesService } from './categories.service';
import { MongoIdDTO } from 'src/dtos/dtos';
import { CategoriesDTO } from './categories.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @UseGuards(JwtGuard)
  @Get('/')
  findAllCategories(): Promise<CategoriesDTO[]> {
    return this.categoriesService.findAllCategories();
  }

  @UseGuards(JwtGuard)
  @Post('/create')
  createCategory(@Body() category: CategoriesDTO): Promise<CategoriesDocument> {
    return this.categoriesService.createCategory(category);
  }

  @UseGuards(JwtGuard)
  @Delete('/delete/:id')
  deleteCategory(@Param() id: MongoIdDTO): Promise<CategoriesDocument> {
    return this.categoriesService.deleteCategory(id);
  }

  @UseGuards(JwtGuard)
  @Patch('/update/:id')
  updateCategory(
    @Param() id: MongoIdDTO,
    @Body() category: CategoriesDTO,
  ): Promise<CategoriesDocument> {
    return this.categoriesService.updateCategory(id, category);
  }
}
