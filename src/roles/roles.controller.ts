import { Body, Controller, Post } from '@nestjs/common';
import { RolesService } from './providers/roles.service';
import { CreateRolesDto } from './dtos/create-roles.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  public createRole(@Body() createRolesDto: CreateRolesDto) {
    return this.rolesService.create(createRolesDto);
  }
}
