/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiHideProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateCategoryDto {
  @ApiHideProperty()
  @IsNumber()
  category_id: number = 1;

  @IsString()
  name: string = 'ASIC';
}
