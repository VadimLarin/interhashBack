import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHideProperty, ApiTags } from '@nestjs/swagger';
import { FastOrderService } from './fast-order.service';
import { UpdateFastOrderDto } from './dto/update-fast-order.dto';
import { fastOrderEntity } from './entities/fast-order.entity';
import { FastOrderDto } from './dto/fast-order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('fast-order')
@Controller('fast-order')
export class FastOrderController {
  constructor(private readonly fastOrderService: FastOrderService) {}

  @Post('new')
  async createOrder(@Body() orderDto: FastOrderDto): Promise<fastOrderEntity> {
    return this.fastOrderService.createOrder(orderDto);
  }

  //@ApiHideProperty()
  //@Post()
  //create(@Body() createFastOrderDto: CreateFastOrderDto) {
  //  return this.fastOrderService.create(createFastOrderDto);
  //}

  @Get('/all')
  //@UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.fastOrderService.findAll();
  }

  @Get('/:id')
  //@UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.fastOrderService.findOne(+id);
  }

  //при обновлении конечную цену нужно рассчитывать самостоятельно
  //@UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateFastOrderDto: UpdateFastOrderDto,
  ) {
    return this.fastOrderService.update(+id, updateFastOrderDto);
  }

  //@UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.fastOrderService.remove(+id);
  }
}
