import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { User } from '../database/entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RequestWithUserInterface } from './interfaces/request-with-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
    return this.authService.me(req.user.userId);
  }
}
