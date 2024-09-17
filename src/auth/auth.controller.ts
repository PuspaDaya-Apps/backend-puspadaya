import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  async login(@Body() loginData: any) {
    return this.authService.login(loginData);
  }
}
