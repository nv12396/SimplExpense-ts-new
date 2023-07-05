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

  getCategoryDetails(category: CategoriesDocument): CategoriesDTO {
    return {
      _id: category._id,
      name: category.name,
      icon: category.icon,
    };
  }

  async findCategoryById(id: string): Promise<CategoriesDTO> {
    const category = await this.categoriesModel.findById(id);
    return this.getCategoryDetails(category);
  }

  async findAllCategories(): Promise<CategoriesDTO[]> {
    const categories = await this.categoriesModel.find({});
    return categories.map((category) => this.getCategoryDetails(category));
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
