import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Metode untuk registrasi
  async register(userData: any) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = this.userRepository.create({
      email: userData.email,
      password: hashedPassword,
      role: 'user',
    });
    await this.userRepository.save(newUser);
    return { message: 'User registered successfully' };
  }

  // Metode untuk login
  async login(loginData: any) {
    const user = await this.userRepository.findOne({
      where: { email: loginData.email },
    });
    if (!user || !(await bcrypt.compare(loginData.password, user.password))) {
      throw new Error('Invalid credentials');
    }
    return { message: 'Login successful' };
  }

  // Metode untuk validasi user
  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({
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
    const { password: _, ...result } = user;
    return result;
  }
}
