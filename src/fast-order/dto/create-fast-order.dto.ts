/* eslint-disable @typescript-eslint/no-inferrable-types */
//import { ApiProperty } from '@nestjs/swagger';
import { ApiHideProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateFastOrderDto {
  @IsString()
  name: string = 'Иван';

  @IsString()
  phone: string = '88005553535';

  @IsString()
  email: string = 'ivan2024@mail.ru';

  @IsNumber()
  product_id: number = 1;

  @ApiHideProperty()
  @IsNumber()
  price: number = 100500;

  @IsNumber()
  quantity: number = 2;

  @ApiHideProperty()
  @IsNumber()
  total: number;
}
