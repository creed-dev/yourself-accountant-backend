import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { User } from '../database/entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RequestWithUserInterface } from './interfaces/request-with-user.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: CreateUserDto): Promise<User> {
    const { email, password } = body;

    return this.authService.signup(email, password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    @Request() req: RequestWithUserInterface,
  ): Promise<{ access_token: string }> {
    return this.authService.login(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() req: RequestWithUserInterface): Promise<User | null> {
    return this.authService.me(req.user.id);
  }
}
