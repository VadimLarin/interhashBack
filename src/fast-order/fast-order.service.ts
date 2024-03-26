import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateFastOrderDto } from './dto/create-fast-order.dto';
import { UpdateFastOrderDto } from './dto/update-fast-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { fastOrderEntity } from './entities/fast-order.entity';
import { FastOrderDto } from './dto/fast-order.dto';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';

@Injectable()
export class FastOrderService {
  create(createFastOrderDto: CreateFastOrderDto) {
    throw new Error('Method not implemented.');
  }
  repository: any;
  constructor(
    @InjectRepository(fastOrderEntity)
    private readonly FastOrderRepository: Repository<fastOrderEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createOrder(orderDto: FastOrderDto): Promise<fastOrderEntity> {
    const { name, phone, email, quantity, product_id } = orderDto;

    const product = await this.productRepository.findOne({
      where: { product_id: product_id },
    });
    if (!product) {
      throw new Error(`Product with id ${product_id} not found`);
    }
    const price = product.prices;
    const total = calculateTotal(price, quantity);

    const newOrder = this.FastOrderRepository.create({
      name,
      phone,
      email,
      quantity,
      price,
      product_id,
      total,
    });
    return this.FastOrderRepository.save(newOrder);
  }

  async findAll(): Promise<fastOrderEntity[]> {
    return this.FastOrderRepository.find();
  }

  async findOne(fast_order_id: number): Promise<fastOrderEntity> {
    return this.FastOrderRepository.findOne({ where: { fast_order_id } });
  }

  //при обновлении конечную цену нужно рассчитывать самостоятельно
  async update(id: number, dto: UpdateFastOrderDto) {
    try {
      const toUpdate = await this.FastOrderRepository.findOne({
        where: { fast_order_id: id },
      });
      if (!toUpdate) {
        throw new BadRequestException(`Запись с id=${id} не найдена`);
      }
      this.FastOrderRepository.merge(toUpdate, dto);
      await this.FastOrderRepository.save(toUpdate);
    } catch (error) {
      console.error('Ошибка при обновлении заказа:', error);
      throw new InternalServerErrorException('Ошибка при обновлении заказа');
    }
  }

  remove(id: number) {
    return this.FastOrderRepository.delete(id);
  }
}
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}
