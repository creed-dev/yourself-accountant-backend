import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUser {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
