import { OrderItemEntity } from 'src/order/entities/orderitem.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  //@Column()
  //cart_id: number;
  @OneToOne(() => OrderItemEntity, (orderItem) => orderItem.users)
  orderItem: OrderItemEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
