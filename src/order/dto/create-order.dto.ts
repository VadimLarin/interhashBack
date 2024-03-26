/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiProperty } from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsNumber, IsPositive, IsString, isNumber } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNumber()
  productid: number;

  @ApiProperty()
  @IsPositive()
  @IsNumber()
  quantity: number;

  @IsNumber()
  prices: number;


  @IsString()
  phone: string;
  
  @IsString()
  surname: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsNumber()
  cart: number;
}