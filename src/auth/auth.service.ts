import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../database/entities/user.entity';
import { RequestWithUserInterface } from './interfaces/request-with-user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      const comparePassword = await bcrypt.compare(password, user.password);

      if (comparePassword) {
        return user;
      }
    }

    return null;
  }

  async signup(email: string, password: string): Promise<User> {
    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new BadRequestException([
        'user with this email is already registered',
      ]);
    } else {
      return this.usersService.create(email, password);
    }
  }

  async login(
    request: RequestWithUserInterface,
  ): Promise<{ access_token: string }> {
    const payload = { email: request.user.email, sub: request.user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  me(id: number): Promise<User | null> {
    return this.usersService.findById(id);
  }
}
