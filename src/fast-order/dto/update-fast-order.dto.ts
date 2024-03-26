import { PartialType } from '@nestjs/swagger';
import { CreateFastOrderDto } from './create-fast-order.dto';

export class UpdateFastOrderDto extends PartialType(CreateFastOrderDto) {}
