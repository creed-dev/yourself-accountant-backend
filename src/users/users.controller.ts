import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../database/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  create(): Promise<User> {
    return this.usersService.create();
  }
}
