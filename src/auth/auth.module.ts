import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './providers/auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/entities/role.entity';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  exports: [AuthService],
  imports: [
    RolesModule,
    TypeOrmModule.forFeature([User, Role]),
    JwtModule.register({
      secret: 'your-secret-key', // Taruh ini di .env untuk keamanan lebih baik
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
