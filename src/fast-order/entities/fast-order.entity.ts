import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

//import { ProductEntity } from 'src/product/entities/product.entity';

@Entity('fastorder')
export class fastOrderEntity {
  @PrimaryGeneratedColumn({ name: 'fast_order_id' })
  fast_order_id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  product_id: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  total: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
