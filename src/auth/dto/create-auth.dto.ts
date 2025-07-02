import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(6)
  email: string;
}
