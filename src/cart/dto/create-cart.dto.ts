/* eslint-disable @typescript-eslint/no-inferrable-types */
//import { ApiProperty } from '@nestjs/swagger';
import { ApiHideProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString } from 'class-validator';

export class CreateCartDto {
  //@ApiHideProperty()
  @IsNumber()
  cart_id: number;

  @IsNumberString()
  user_id: number = 1;

  @IsNumber()
  product_id: number = 1;

  @IsNumber()
  quantity: number = 2;

  //@ApiHideProperty()
  @IsNumber()
  total: number;

  //@ApiHideProperty()
  @IsNumber()
  orderId: number;
}
