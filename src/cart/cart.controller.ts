import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartEntity } from './entities/cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiBearerAuth, ApiHideProperty, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('cart')
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/addToCart')
  //@UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  add(@Body() dto: CreateCartDto): Promise<CartEntity> {
    //const { product_id, quantity, total } = dto;
    return this.cartService.addToCart(dto);
  }

  @Get('/all')
  //@UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.cartService.findAll();
  }

  @Get('/:id')
  //@UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: number): Promise<CartEntity> {
    return this.cartService.findOne(+id);
  }

  @Get('user/:userId')
  //@UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAllByUser(@Param('userId') userId: number): Promise<CartEntity[]> {
    return this.cartService.findAllByUser(userId);
  }

  @ApiBearerAuth()
  @Patch(':id')
  //@UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  //@UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: number) {
    return this.cartService.remove(+id);
  }
}
