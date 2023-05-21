import { IsMongoId, IsString } from 'class-validator';

export class MongoIdDTO {
  @IsMongoId()
  id: string;
}
