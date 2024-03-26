import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { getPostgresConfig } from './configs/postgres.config';
import { PromoModule } from './promo/promo.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { FastOrderModule } from './fast-order/fast-order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (ConfigService: ConfigService) => ({
        type: 'postgres',
        host: ConfigService.get('DATABASE_HOST'),
        port: ConfigService.get('DATABASE_PORT'),
        username: ConfigService.get('DATABASE_USERNAME'),
        password: ConfigService.get('DATABASE_PASSWORD'),
        database: ConfigService.get('DATABASE_NAME'),
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
      }),
      inject: [ConfigService],
      //useFactory: getPostgresConfig,
    }),
    PromoModule,
    CategoryModule,
    ProductModule,
    UsersModule,
    AuthModule,
    CartModule,
    OrderModule,
    FastOrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
