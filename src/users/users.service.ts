import { User, UserDocument } from './../schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async update(id: string, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
    });
  }

  async delete(id): Promise<any> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
