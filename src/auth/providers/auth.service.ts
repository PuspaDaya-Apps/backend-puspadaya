/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Body,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { RolesService } from 'src/roles/providers/roles.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly rolesService: RolesService,
    private readonly jwtService: JwtService,
  ) {}

  async register(@Body() registerUserDto: RegisterUserDto) {
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    const user = await this.usersRepository.findOne({
      where: { email: registerUserDto.email },
    });
    console.log(user);

    if (user) {
      throw new HttpException(
        { status: 'error', message: 'User already exists' },
        400,
      );
    }

    let role = null;
    if (registerUserDto.role) {
      role = await this.rolesService.findOne(
        registerUserDto.role.toLowerCase(),
      );
      console.log(role);
      if (!role) {
        throw new HttpException(
          { status: 'error', message: 'Role not found' },
          404,
        );
      }
    }

    const newUser = this.usersRepository.create({
      ...registerUserDto,
      password: hashedPassword,
      role: role, // Role bisa null jika tidak disertakan
    });

    await this.usersRepository.save(newUser);

    return { status: 'success', message: 'User registered successfully' };
  }

  // Metode untuk login
  async login(loginData: User) {
    const user = await this.usersRepository.findOne({
      where: { email: loginData.email },
    });
    if (!user || !(await bcrypt.compare(loginData.password, user.password))) {
      throw new Error('Invalid credentials');
    }
    return { status: 'success', message: 'Login successful' };
  }

  // Metode untuk validasi user
  async validateUser(userEmail: string, userPassword: string) {
    try {
      const findUser = await this.usersRepository.findOne({
        where: { email: userEmail },
      });

      if (!findUser) throw new HttpException('Invalid credentials', 401);
      const comparePassword = await bcrypt.compare(
        userPassword,
        findUser.password,
      );
      if (!comparePassword) throw new HttpException('Invalid credentials', 401);

      const {
        password,
        phone_number,
        role,
        created_at,
        updated_at,
        username,
        ...user
      } = findUser;

      const token = this.jwtService.sign(user);
      return {
        status: 'success',
        token,
        expires_in: 3600,
      };
    } catch (error) {
      throw error;
    }
  }
}
