import { Controller } from '@nestjs/common';
import { Post, Body, Delete, Param, Get, Patch } from '@nestjs/common';

import { CategoriesDocument } from './categories.schema';
import { CategoriesService } from './categories.service';
import { MongoIdDTO } from 'src/dtos/dtos';
import { CategoriesDTO } from './categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('/')
  findAllCategories(): Promise<CategoriesDocument[]> {
    return this.categoriesService.findAllCategories();
  }

  @Post('/create')
  createCategory(@Body() category: CategoriesDTO): Promise<CategoriesDocument> {
    return this.categoriesService.createCategory(category);
  }

  @Delete('/delete/:id')
  deleteCategory(@Param() id: MongoIdDTO): Promise<CategoriesDocument> {
    return this.categoriesService.deleteCategory(id);
  }

  @Patch('/update/:id')
  updateCategory(
    @Param() id: MongoIdDTO,
    @Body() category: CategoriesDTO,
  ): Promise<CategoriesDocument> {
    return this.categoriesService.updateCategory(id, category);
  }
}
