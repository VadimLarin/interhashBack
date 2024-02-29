import { 
   Controller,
   Get,
   Post, 
   Body,
   Patch,
   Param, 
   Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addToCart(@Body() data: { productId: number; quantity: number }) {
    return this.cartService.addToCart(data.productId, data.quantity);

  //@Delete(':cart_id')
  //remove(@Param('cart_id') id: string) {
    //return this.cartService.remove(+cart_id)
  //}
}