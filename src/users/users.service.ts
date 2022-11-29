import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    { email: 'test@email.com', password: '123456' },
  ];

  create(user: User) {
    this.users.push(user);
  }

  getAll(): User[] {
    return this.users;
  }
}
