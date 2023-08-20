import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDetails } from './user-details.interface';
import { UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  _getUserDetails(user: UserDocument): UserDetails {
    return {
      id: user.id,
      name: user.name,
      currency: user.currency,
      email: user.email,
    };
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }

  async create(
    name: string,
    email: string,
    currency: string,
    password: string,
  ): Promise<UserDocument> {
    const newUser = await this.userModel.create({
      name,
      email,
      currency,
      password,
    });

    return await newUser.save();
  }

  async updateEmail(id: string, email: string): Promise<UserDocument> {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    const updatedEmail = await this.userModel
      .findOneAndUpdate(
        { _id: id },
        {
          email,
        },
        { new: true },
      )
      .exec();
    return updatedEmail;
  }

  async updateName(id: string, name: string): Promise<UserDocument> {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    const updatedName = await this.userModel
      .findOneAndUpdate(
        { _id: id },
        {
          name,
        },
        { new: true },
      )
      .exec();
    return updatedName;
  }

  async updateUserDetails(
    id: string,
    newUserDetails: UserDetails,
  ): Promise<UserDocument> {
    const { name, email, currency } = newUserDetails;

    const updatedUserDetails = this.userModel.findByIdAndUpdate(id, {
      name,
      email,
      currency,
    });

    return updatedUserDetails;
  }
}
