import { IsOptional, IsString } from 'class-validator';

export class UserDataDto {
  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  password?: string | number;
}
