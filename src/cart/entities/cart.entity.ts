import { ApiHideProperty } from '@nestjs/swagger';
import { ProductEntity } from 'src/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn({ name: 'cart_id' })
  id: number;

  @ManyToOne(() => ProductEntity, { eager: true })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column()
  quantity: number;
}
