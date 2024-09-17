import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRolesDto } from '../dtos/create-roles.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  public async create(@Body() createRolesDto: CreateRolesDto) {
    const newRole = this.rolesRepository.create(createRolesDto);
    await this.rolesRepository.save(newRole);

    console.log(newRole);
    return newRole;
  }
}
