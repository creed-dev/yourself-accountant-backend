import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestWithUser } from '../../../interfaces/request-with-user';
import * as bcrypt from 'bcrypt';
import { User } from '../../../database/entities/user';
import { UsersService } from '../users/users.service';

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
    const existingUser = await this.usersService.findByEmail(
      email.toLowerCase(),
    );

    if (existingUser) {
      throw new BadRequestException({
        message: 'Пользователь с таким email уже зарегистрирован',
      });
    } else {
      return this.usersService.create(email, password);
    }
  }

  async login(request: RequestWithUser): Promise<{ accessToken: string }> {
    const payload = { email: request.user.email, sub: request.user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  me(id: number): Promise<User | null> {
    return this.usersService.findById(id);
  }
}
