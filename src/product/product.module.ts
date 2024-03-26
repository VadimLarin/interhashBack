import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductEntity } from './entities/product.entity';
import { CategoryModule } from 'src/category/category.module';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { CategoryService } from 'src/category/category.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity]),
    CategoryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
