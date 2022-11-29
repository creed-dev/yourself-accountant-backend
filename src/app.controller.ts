import { Controller, Get, Post, Req, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { UserDataDto } from './users/dto/user-data.dto';

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() request: Request): any {
    // return this.appService.getHello();
    return request.body;
  }

  @Post()
  postHello(): string {
    return 'Hello created!';
  }

  @Get('body')
  getBody(@Body() userDataDto: UserDataDto): string {
    // return this.appService.getHello();
    return `
      email - ${userDataDto.email}
      password - ${userDataDto.password}
    `;
  }

  @Get(':id')
  getOneHello(@Param('id') id: string): string {
    // return this.appService.getHello();
    return `Get Hello with ID - #${id}`;
  }
}
