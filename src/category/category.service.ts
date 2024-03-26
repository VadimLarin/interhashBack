import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';

@Injectable()
export class CategoryService {
  productRepository: any;
  categoryRepository: any;
  constructor(
    @InjectRepository(CategoryEntity)
    private repository: Repository<CategoryEntity>,
  ) {}

  create(dto: CreateCategoryDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  findOneByName(name: string) {
    return this.repository.findOneBy({ name });
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const toUpdate = await this.repository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Запись с id=${id} не найдена`);
    }
    if (dto.name) {
      toUpdate.name = dto.name;
    }
    return this.repository.save(toUpdate);
  }

  async remove(id: number): Promise<void> {
    const category = await this.repository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Категория не найдена');
    }

    await this.productRepository.update(
      { category: category.id },
      { category: 0 },
    );

    await this.categoryRepository.delete(id);
  }
}
