import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestWithUserInterface } from './interfaces/request-with-user.interface';
import * as bcrypt from 'bcrypt';
import { User } from '../../database/entities/user.entity';
import { UsersService } from '../../api/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.getByEmailWithPassword(email);

    if (user) {
      const comparePassword = await bcrypt.compare(
        String(password),
        user.password,
      );

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
