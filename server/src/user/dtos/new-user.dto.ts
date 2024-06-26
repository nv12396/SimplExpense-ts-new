import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class NewUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  currency: string;

  @MinLength(6)
  @IsString()
  password: string;

  isAdmin: boolean;
}
