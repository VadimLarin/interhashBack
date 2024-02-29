import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from './entities/cart.entity';
import { ProductEntity } from '../product/entities/product.entity';

@Injectable()
export class CartService {
  repository: any;
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  create(dto: CreateCartDto) {
    return this.cartRepository.save(dto);
  }

  findAll() {
    return this.cartRepository.find();
  }

  findOne(id: number) {
    return this.cartRepository.findOneBy({ id });
  }

  async addToCart(productId: number, quantity: number): Promise<CartEntity> {
    const cart = new CartEntity();

    const product = await this.productRepository.findOne({
      where: { product_id: productId },
    });

    if (!product) {
      throw new Error('Продукт не найден');
    }

    cart.product = product;
    cart.quantity = quantity;

    return await this.cartRepository.save(cart);
  }

    remove(id: number) {
    return this.cartRepository.delete(id);
  }

  async update(id: number, dto: UpdateCartDto) {
    const toUpdate = await this.repository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Запись с id=${id} не найдена`);
    }
    if (dto.name) {
      toUpdate.name = dto.name;
    }
    return this.repository.save(toUpdate);
  }
  }
