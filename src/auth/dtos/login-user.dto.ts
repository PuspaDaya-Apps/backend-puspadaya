import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email harus berupa alamat email yang valid' })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
