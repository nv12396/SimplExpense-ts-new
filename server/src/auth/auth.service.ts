import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';

import { ExistingUserDTO } from 'src/user/dtos/existing-user.dto';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UserDetails } from 'src/user/user-details.interface';
import { AuthUserWithTokenDTO } from './auth-user.dto';
import { TotalAmountService } from 'src/total-amount/total-amount.service';
import { MongoIdDTO } from 'src/dtos/dtos';
import mongoose from 'mongoose';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private totalAmountService: TotalAmountService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async getUser(userId: string): Promise<UserDetails> {
    const user = await this.userService.findById(userId);
    return this.userService._getUserDetails(user);
  }

  async register(user: Readonly<NewUserDTO>): Promise<AuthUserWithTokenDTO> {
    const { name, email, currency, password } = user;

    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('User Already exist');
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.userService.create(
      name,
      email,
      currency,
      hashedPassword,
    );

    const registredUser = this.userService._getUserDetails(newUser);
    const jwt = await this.jwtService.signAsync(registredUser, {
      secret: process.env.JWT_SECRET,
    });
    const userIdDto: MongoIdDTO = { id: registredUser.id };
    await this.totalAmountService.createTotalAmount(userIdDto.id, 0);

    return { registredUser, token: jwt };
  }

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetails | any> {
    const user = await this.userService.findByEmail(email);

    const doesUserExist = !!user;

    if (!doesUserExist) {
      throw new ConflictException('User does not exist');
    }

    const passwordMatches = await this.doesPasswordMatch(
      password,
      user.password,
    );

    if (!passwordMatches) {
      throw new ConflictException('Password does not match');
    }

    return this.userService._getUserDetails(user);
  }

  async login(existingUser: ExistingUserDTO): Promise<AuthUserWithTokenDTO> {
    const { email, password } = existingUser;

    const user = await this.validateUser(email, password);

    if (!user) {
      return null;
    }

    const jwt = await this.jwtService.signAsync(user, {
      secret: process.env.JWT_SECRET,
    });
    return this.toAuthUserDTO(user, jwt);
  }

  toAuthUserDTO(user: UserDetails, token: string): AuthUserWithTokenDTO {
    return { token, registredUser: user };
  }
}
