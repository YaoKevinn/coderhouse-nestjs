import { Product, ProductDocument } from './../schemas/product.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findById(id: string): Promise<Product> {
    return await this.productModel.findById(id).exec();
  }

  async create(product: Product): Promise<Product> {
    const createdProduct = new this.productModel(product);
    return createdProduct.save();
  }

  async update(id: string, product: Product): Promise<Product> {
    return await this.productModel.findByIdAndUpdate(id, product, {
      new: true,
    });
  }

  async delete(id): Promise<any> {
    return await this.productModel.findByIdAndDelete(id);
  }
}
