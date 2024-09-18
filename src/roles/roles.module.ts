import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './providers/roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';

@Module({
  exports: [RolesService],
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
