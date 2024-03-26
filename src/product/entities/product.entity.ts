import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CategoryEntity } from 'src/category/entities/category.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';
//import { fastOrderEntity } from 'src/fast-order/entities/fast-order.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn({ name: 'product_id' })
  product_id: number;

  @Column()
  image: string;

  @Column()
  brand: string;

  @Column()
  name: string;

  @Column()
  hashrate: number;

  @Column()
  consumptionWatts: number;

  @Column()
  algorithm: string;

  @Column()
  description: string;

  @Column() //, { array: true })
  prices: number;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    eager: true,
    //onDelete: 'CASCADE', //??? что точно удалит - проверить
  })
  @JoinColumn()
  category: CategoryEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  //@Column()
  //carts: number;
  @ManyToOne(() => CartEntity, (cart) => cart.product)
  @JoinColumn()
  carts: CartEntity[];
}
