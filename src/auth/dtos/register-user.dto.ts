import {
  IsString,
  IsEmail,
  IsOptional,
  Length,
  Matches,
  IsNotEmpty,
} from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50, { message: 'Username harus berisi antara 1 - 50 karakter' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100, { message: 'Nama harus berisi antara 1 - 100 karakter' })
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Email harus berupa alamat email yang valid' })
  @Length(1, 100, { message: 'Email harus berisi antara 1 - 100 karakter' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,255}$/,
    {
      message:
        'Password minimal 6 karakter, harus mengandung huruf kecil, huruf besar, angka, dan karakter special',
    },
  )
  password: string;

  @IsOptional()
  @Matches(/^[0-9]+$/, { message: 'Nomor telepon harus berupa angka' })
  @Length(10, 15, {
    message: 'Nomor telepon harus berisi antara 10 - 15 karakter',
  })
  phone_number?: string | null;
}
