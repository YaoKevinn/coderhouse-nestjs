import { CreateUserDto } from 'src/dto/create-user.dto';
import { UsersService } from './users.service';
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
import { User } from 'src/interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const user = await this.usersService.findById(id);
    return response.status(HttpStatus.OK).json(user);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Put('/:id')
  async update(@Res() response, @Param('id') id, @Body() user: User) {
    const updatedUser = await this.usersService.update(id, user);
    return response.status(HttpStatus.OK).json(updatedUser);
  }

  @Delete('/:id')
  async delete(@Param('id') id) {
    return await this.usersService.delete(id);
  }
}
