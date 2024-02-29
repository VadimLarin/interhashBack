import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from './entities/cart.entity';
import { ProductEntity } from '../product/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async addToCart(productId: number, quantity: number): Promise<CartEntity> {
    const cart = new CartEntity();

    const product = await this.productRepository.findOne({ where: { product_id: productId } });

    if (!product) {
      throw new Error('Product not found');
    }

    cart.product = product;
    cart.quantity = quantity;

    return await this.cartRepository.save(cart);
  }
}
