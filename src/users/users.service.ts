import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    { email: 'test@email.com', password: '123456' },
    { email: 'test2@email.com', password: '789' },
  ];

  create(user: User) {
    this.users.push(user);
  }

  getAll(): User[] {
    return this.users;
  }

  getOne(id: number): User {
    return this.users[id];
  }
}
