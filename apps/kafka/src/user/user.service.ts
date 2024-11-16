import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { Model, Types } from 'mongoose';
import { MESSAGES } from '@nestjs/core/constants';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneUser(username: string): Promise<any> {
    const user = await this.userModel.findOne({ username: username });
    if (!user) {
      return new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async deleteUser(IDUser: string): Promise<any> {
    const user = await this.userModel.findById(IDUser);
    if (!user) {
      return new Error('User not found');
    }
    await this.userModel.deleteOne({ _id: IDUser });
    return { message: 'User deleted successfully' };
  }
}
