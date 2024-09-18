import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRolesDto {
  @IsString({
    message: 'Nama role harus berupa huruf',
  })
  @IsNotEmpty({
    message: 'Role name tidak boleh kosong',
  })
  role_name: string;

  @IsString({
    message: 'Deskripsi role harus berupa huruf',
  })
  @IsOptional()
  description: string;
}
