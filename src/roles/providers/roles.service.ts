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

  public async create(@Body() createRolesDto: CreateRolesDto): Promise<Role> {
    const newRole = this.rolesRepository.create(createRolesDto);
    await this.rolesRepository.save(newRole);

    console.log(newRole);
    return newRole;
  }

  // public async findOne(id: string): Promise<Role> {
  //   const role = await this.rolesRepository.findOneBy({ id });
  //   console.log(role);
  //   return role;
  // }
  public async findOne(role_name: string): Promise<Role> {
    const role = await this.rolesRepository.findOne({
      where: { role_name },
    });
    console.log(role);
    return role;
  }
}
