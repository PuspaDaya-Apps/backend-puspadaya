import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
  }

  //* Testing route
  @Get('test')
  @UseGuards(JwtAuthGuard)
  test(@Req() req: Request) {
    console.log(req);
    console.log(req.user);
    return req.user;
  }
}
