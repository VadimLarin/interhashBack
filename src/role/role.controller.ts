import { Controller } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // @Get()
  // findAll() {
  //   return this.roleService.getRoles();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   return this.roleService.getRoleById(id);
  // }
}
