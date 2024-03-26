import { ApiHideProperty } from '@nestjs/swagger';
import { ProductEntity } from 'src/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiHideProperty()
  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
