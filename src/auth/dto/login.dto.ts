import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MaxLength(12)
  @MinLength(4)
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  password: string;
}
