import { Controller, Post, Body } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addToCart(@Body() data: { productId: number; quantity: number }) {
    return this.cartService.addToCart(data.productId, data.quantity);
  }
}
