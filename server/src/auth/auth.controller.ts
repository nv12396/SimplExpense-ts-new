import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { ExistingUserDTO } from 'src/user/dtos/existing-user.dto';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { AuthService } from './auth.service';
import { AuthUserDTO, AuthUserWithTokenDTO } from './auth-user.dto';

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
  login(@Body() user: ExistingUserDTO): Promise<AuthUserDTO> {
    return this.authService.login(user);
  }
}
