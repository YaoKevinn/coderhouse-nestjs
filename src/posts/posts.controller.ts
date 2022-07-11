import { CreatePostDto } from './../dto/create-post.dto';
import { PostsService } from './posts.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Post as IPost } from 'src/interfaces/post.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(): Promise<IPost[]> {
    return this.postsService.findAll();
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const post = await this.postsService.findById(id);
    return response.status(HttpStatus.OK).json(post);
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postsService.create(createPostDto);
  }

  @Put('/:id')
  async update(@Res() response, @Param('id') id, @Body() post: IPost) {
    const updatedPost = await this.postsService.update(id, post);
    return response.status(HttpStatus.OK).json(updatedPost);
  }

  @Delete('/:id')
  async delete(@Param('id') id) {
    return await this.postsService.delete(id);
  }
}
