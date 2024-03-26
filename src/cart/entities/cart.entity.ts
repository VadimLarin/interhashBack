//import { ApiHideProperty } from '@nestjs/swagger'; // ??
import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn({ name: 'cart_id' })
  cart_id: number;

  @Column()
  product_id: number;
  //@ManyToOne(() => ProductEntity, (product) => product.carts)
  //product_id: ProductEntity;

  @Column() //({ nullable: true })
  user_id: number;
  //@ManyToOne(() => UserEntity, { eager: true })
  //@JoinColumn({ name: 'user_id' })
  //user_id: UserEntity;

  @Column()
  quantity: number;

  @Column()
  total: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
  product: any;

  @ManyToOne(() => OrderEntity, (order) => order.cart)
  order: OrderEntity;
  orderItem: any;
}
