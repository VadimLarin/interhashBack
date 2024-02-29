import { 
   Controller,
   Get,
   Post, 
   Body,
   Patch,
   Param, 
   Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addToCart(@Body() data: { productId: number; quantity: number }) {
    return this.cartService.addToCart(data.productId, data.quantity);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCategoryDto);
  }
  //@Delete(':cart_id')
  //remove(@Param('cart_id') id: string) {
    //return this.cartService.remove(+cart_id)
  //}
}