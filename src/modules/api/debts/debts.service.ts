import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Debt } from '../../../database/entities/debt.entity';
import { CreateDebt } from './dto/create-debt';
import { User } from '../../../database/entities/user.entity';
import { UpdateDebt } from './dto/update-debt';

@Injectable()
export class DebtsService {
  constructor(
    @InjectRepository(Debt)
    private debtsRepository: Repository<Debt>,
  ) {}

  create(user: User, createDebtDTO: CreateDebt): Promise<Debt> {
    return this.debtsRepository.save({
      user,
      ...createDebtDTO,
    });
  }

  async update(user: User, id: number, body: UpdateDebt): Promise<Debt | null> {
    const obj = await this.debtsRepository.findOne({
      where: {
        id,
        user: {
          id: user.id,
        },
      },
    });

    if (obj) {
      obj.amount = body.amount;
      obj.date = body.date;
      await this.debtsRepository.save(obj);

      return obj;
    } else {
      throw new BadRequestException(['Неверный ID']);
    }
  }

  async delete(user: User, id: number): Promise<Debt | null> {
    const obj = await this.debtsRepository.findOne({
      where: {
        id,
        user: {
          id: user.id,
        },
      },
    });

    if (obj) {
      await this.debtsRepository.remove(obj);

      return obj;
    } else {
      throw new BadRequestException(['Неверный ID']);
    }
  }
}
