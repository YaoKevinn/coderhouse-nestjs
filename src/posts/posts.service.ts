import { Post, PostDocument } from './../schemas/post.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async findById(id: string): Promise<Post> {
    return await this.postModel.findById(id).exec();
  }

  async create(post: Post): Promise<Post> {
    const createdPost = new this.postModel(post);
    return createdPost.save();
  }

  async update(id: string, post: Post): Promise<Post> {
    return await this.postModel.findByIdAndUpdate(id, post, {
      new: true,
    });
  }

  async delete(id): Promise<any> {
    return await this.postModel.findByIdAndDelete(id);
  }
}
