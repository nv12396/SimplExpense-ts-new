import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CategoriesDocument } from './categories.schema';
import { CategoriesDTO } from './categories.dto';
import { MongoIdDTO } from 'src/dtos/dtos';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Categories')
    private categoriesModel: Model<CategoriesDocument>,
  ) {}

  async findCategoryById(id: string): Promise<CategoriesDocument> {
    return await this.categoriesModel.findById(id);
  }

  async findAllCategories(): Promise<CategoriesDocument[]> {
    return await this.categoriesModel.find({});
  }

  async createCategory(category: CategoriesDTO): Promise<CategoriesDocument> {
    const { name } = category;
    const newTransactions = await this.categoriesModel.create({ name });
    return await newTransactions.save();
  }

  async deleteCategory(categoryId: MongoIdDTO): Promise<CategoriesDocument> {
    const { id } = categoryId;
    const deletedCategory = await this.categoriesModel.findByIdAndDelete(id);
    return deletedCategory;
  }

  async updateCategory(
    categoryId: MongoIdDTO,
    category: CategoriesDTO,
  ): Promise<CategoriesDocument> {
    const { id } = categoryId;
    const { name } = category;
    const updatedCategory = await this.categoriesModel.findByIdAndUpdate(
      id,
      {
        name,
      },
      { new: true },
    );
    return updatedCategory;
  }
}
