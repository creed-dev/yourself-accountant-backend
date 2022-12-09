import { Injectable } from '@nestjs/common';
import { User } from '../database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(email: string, password: string): Promise<User> {
    const hashPassword = bcrypt.hashSync(password, 10);

    return this.usersRepository.save({
      email,
      password: hashPassword,
    });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  getPasswordByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      select: ['password'],
    });
  }

  findById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
