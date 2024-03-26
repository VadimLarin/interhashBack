import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FastOrderService } from './fast-order.service';
import { FastOrderController } from './fast-order.controller';
import { fastOrderEntity } from './entities/fast-order.entity'; // Fast/fast
import { ProductEntity } from 'src/product/entities/product.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([fastOrderEntity, ProductEntity]),
  ],
  controllers: [FastOrderController],
  providers: [FastOrderService],
})
export class FastOrderModule {}
