import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from '../dtos/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // Metode untuk registrasi
  async register(@Body() registerUserDto: RegisterUserDto) {
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    console.log(registerUserDto);
    // // const newUser = this.usersRepository.create({
    // //   email: registerUserDto.email,
    // //   password: hashedPassword,
    // //   role: 'user',
    // // });
    // const newUser = await this.usersRepository.findOneBy({
    //   id: registerUserDto.id,
    // });
    // await this.usersRepository.save();
    return { message: 'User registered successfully' };
  }

  // Metode untuk login
  async login(loginData: any) {
    const user = await this.usersRepository.findOne({
      where: { email: loginData.email },
    });
    if (!user || !(await bcrypt.compare(loginData.password, user.password))) {
      throw new Error('Invalid credentials');
    }
    return { message: 'Login successful' };
  }

  // Metode untuk validasi user
  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
    });
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    // Menghapus password sebelum return data user
    // const { password: _, ...result } = user;
    // return result;
  }
}
