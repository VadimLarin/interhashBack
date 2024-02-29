import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CategoryEntity } from 'src/category/entities/category.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn({ name: 'product_id' })
  product_id: number;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('int', { array: true })
  sizes: number[];

  @Column('int', { array: true })
  prices: number[];

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    eager: true,
    //onDelete: 'CASCADE', ??? что точно удалит - проверить
  })
  @JoinColumn()
  category: CategoryEntity;
}
