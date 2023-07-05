import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ExistingUserDTO } from 'src/user/dtos/existing-user.dto';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { AuthService } from './auth.service';
import { AuthUserWithTokenDTO } from './auth-user.dto';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() user: NewUserDTO): Promise<AuthUserWithTokenDTO> {
    return this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  login(@Body() user: ExistingUserDTO): Promise<AuthUserWithTokenDTO> {
    return this.authService.login(user);
  }

  @UseGuards(JwtGuard)
  @Get('validate')
  validateUser(): boolean {
    const userExist = true;
    return userExist;
  }
}
