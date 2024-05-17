import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderEntity } from './entities/order.entity';
import { CartModule } from 'src/cart/cart.module';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { OrderItemEntity } from './entities/orderitem.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]),
    CartModule,
    JwtModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
