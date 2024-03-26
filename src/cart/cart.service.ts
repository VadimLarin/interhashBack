import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from './entities/cart.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class CartService {
  repository: any;
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  //create(dto: CreateCartDto) {
  //  //return this.cartRepository.save(dto); // каво чиво - ошибка дто
  //}

  findAll() {
    return this.cartRepository.find();
  }

  findOne(cart_id: number) {
    return this.cartRepository.findOneBy({ cart_id });
  }

  async findAllByUser(userId: number): Promise<CartEntity[]> {
    return this.cartRepository.find({ where: { user_id: userId } });
  }

  async addToCart(dto: CreateCartDto): Promise<CartEntity> {
    const cart = new CartEntity();
    cart.product_id = dto.product_id;
    cart.quantity = dto.quantity;
    //cart.total = dto.total;

    const product = await this.productRepository.findOne({
      where: { product_id: dto.product_id },
    });
    if (!product) {
      throw new Error('Product not found');
    }

    cart.total = product.prices * dto.quantity;
    return this.cartRepository.save(cart);
  }

  async updateQuantity(
    quantity: number,
    product_id: number,
  ): Promise<{ quantity: number }> {
    const existingCart = await this.cartRepository.findOne({
      where: { product_id },
    });
    if (!existingCart) {
      throw new Error(`Cart with product_id ${product_id} not found`);
    }
    await this.cartRepository.update({ product_id }, { quantity });

    const product = await this.cartRepository.findOne({
      where: { product_id },
    });
    return { quantity: product.quantity };
  }

  async updateTotalPrice(
    total: number,
    product_id: number,
  ): Promise<{ total: number }> {
    await this.cartRepository.update({ total }, { product_id });

    const product = await this.cartRepository.findOne({
      where: { product_id },
    });
    return { total: product.total };
  }

  async remove(id: number) {
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
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}
