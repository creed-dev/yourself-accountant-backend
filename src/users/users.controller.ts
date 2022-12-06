import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { UserDataDto } from './dto/user-data.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll(): User[] {
    return this.usersService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): User {
    return this.usersService.getOne(id);
  }

  @Post()
  create(@Body() userDataDto: UserDataDto): string {
    return 'User successfully created';
  }
}
