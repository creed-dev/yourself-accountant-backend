import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../common/jwt/jwt-auth.guard';
import { RequestWithUser } from '../../../interfaces/request-with-user';
import { User } from '../../../database/entities/user.entity';
import { CreateUser } from '../users/dto/create-user';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: CreateUser): Promise<User> {
    const { email, password } = body;

    return this.authService.signup(email, password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: RequestWithUser): Promise<{ accessToken: string }> {
    return this.authService.login(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() req: RequestWithUser): Promise<User | null> {
    return this.authService.me(req.user.id);
  }
}
