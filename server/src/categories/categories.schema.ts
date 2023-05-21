import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type CategoriesDocument = Categories & Document;

@Schema({ timestamps: true })
export class Categories {
  @Prop({ required: true })
  name: string;
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);
