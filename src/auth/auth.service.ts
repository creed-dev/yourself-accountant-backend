import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../database/entities/user.entity';
import { RequestWithUserInterface } from './interfaces/request-with-user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(
    request: RequestWithUserInterface,
  ): Promise<{ access_token: string }> {
    const payload = { email: request.user.email, sub: request.user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  me(id: number): Promise<User | null> {
    return this.usersService.findById(id);
  }
}
