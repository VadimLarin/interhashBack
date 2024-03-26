import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,

    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(
    dto: CreateProductDto,
    image: Express.Multer.File,
  ): Promise<ProductEntity> {
    const product = new ProductEntity();
    product.image = image.filename;
    product.name = dto.name;
    product.description = dto.description;
    product.prices = dto.prices;
    product.brand = dto.brand;
    product.hashrate = dto.hashrate;
    product.consumptionWatts = dto.consumptionWatts;
    product.algorithm = dto.algorithm;

    const newProduct = await this.productRepository.save(product);

    const category = await this.categoryRepository.findOne({
      where: { id: dto.categoryId },
      relations: ['products'],
    });

    category.products.push(product);

    await this.categoryRepository.save(category);

    return newProduct;
  }

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }
  async AllProducts(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async findOne(product_id: number): Promise<ProductEntity> {
    return this.productRepository.findOne({ where: { product_id } });
  }

  async findByCategoryId(categoryId: number): Promise<ProductEntity[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.categoryId = :categoryId', { categoryId })
      .getMany();
  }

  async update(
    product_id: number,
    dto: UpdateProductDto,
    image: Express.Multer.File,
  ): Promise<ProductEntity> {
    const toUpdate = await this.productRepository.findOne({
      where: { product_id },
    });
    if (!toUpdate) {
      throw new BadRequestException(
        `Записи с product_id=${product_id} не найдено`,
      );
    }
    if (dto.name) toUpdate.name = dto.name;
    if (dto.description) toUpdate.description = dto.description;
    if (dto.prices) toUpdate.prices = dto.prices;
    if (dto.brand) toUpdate.brand = dto.brand;
    if (dto.hashrate) toUpdate.hashrate = dto.hashrate;
    if (dto.consumptionWatts) toUpdate.consumptionWatts = dto.consumptionWatts;
    if (dto.algorithm) toUpdate.algorithm = dto.algorithm;
    if (dto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: dto.categoryId },
        relations: ['products'],
      });
      toUpdate.category = category;
    }
    if (image) {
      if (toUpdate.image !== image.filename) {
        fs.unlink(`db_images/product/${toUpdate.image}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      toUpdate.image = image.filename;
    }

    return this.productRepository.save(toUpdate);
  }

  async delete(product_id: number): Promise<DeleteResult> {
    return this.productRepository.delete(product_id);
  }
}
