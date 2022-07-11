import { CreateProductDto } from './../dto/create-product.dto';
import { ProductsService } from './products.service';
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
import { Product } from 'src/interfaces/product.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const product = await this.productsService.findById(id);
    return response.status(HttpStatus.OK).json(product);
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @Put('/:id')
  async update(@Res() response, @Param('id') id, @Body() product: Product) {
    const updatedProduct = await this.productsService.update(id, product);
    return response.status(HttpStatus.OK).json(updatedProduct);
  }

  @Delete('/:id')
  async delete(@Param('id') id) {
    return await this.productsService.delete(id);
  }
}
