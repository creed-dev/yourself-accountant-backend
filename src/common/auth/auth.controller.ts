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
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RequestWithUser } from './interfaces/request-with-user.interface';
import { User } from '../../database/entities/user.entity';
import { CreateUserDto } from '../../api/users/dto/create-user.dto';

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
  login(@Request() req: RequestWithUser): Promise<{ accessToken: string }> {
    return this.authService.login(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() req: RequestWithUser): Promise<User | null> {
    return this.authService.me(req.user.id);
  }
}
