import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

import { UserService } from './user.service';
import { UserDetails } from './user-details.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Patch('/update-email/:id')
  updateEmail(
    @Param('id') id: string,
    @Body('email') email: string,
  ): Promise<any> {
    return this.userService.updateEmail(id, email);
  }

  @UseGuards(JwtGuard)
  @Patch('/update-name/:id')
  updateName(
    @Param('id') id: string,
    @Body('name') email: string,
  ): Promise<any> {
    return this.userService.updateEmail(id, email);
  }

  @UseGuards(JwtGuard)
  @Patch('/update-settings/:id')
  updateSettings(
    @Param('id') id: string,
    @Body() newUserDetails: UserDetails,
  ): Promise<any> {
    return this.userService.updateUserDetails(id, newUserDetails);
  }
}
