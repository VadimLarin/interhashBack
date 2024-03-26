/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { OrderItemEntity } from './orderitem.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  cart: number;

  @OneToMany(() => OrderItemEntity, (item) => item.id)
  @JoinColumn()
  items: OrderItemEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  
}