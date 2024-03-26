/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumberString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  image: Express.Multer.File;

  @IsString()
  name: string = 'Antminer S19 90Th';

  @IsString()
  description: string = 'оно майнит 300к ₽ в наносекунду';

  @IsNumberString()
  categoryId: number = 1;

  @IsNumberString()
  prices: number = 25600;

  @IsString()
  brand: string = 'Bitmain';

  @IsNumberString()
  hashrate: number = 9050;

  @IsNumberString()
  consumptionWatts: number = 3300;

  @IsString()
  algorithm: string;
}
