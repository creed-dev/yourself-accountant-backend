import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Debt } from '../../database/entities/debt.entity';
import { CreateDebtDto } from './dto/create-debt.dto';
import { User } from '../../database/entities/user.entity';
import { UpdateDebtDto } from './dto/update-debt.dto';

@Injectable()
export class DebtsService {
  constructor(
    @InjectRepository(Debt)
    private debtsRepository: Repository<Debt>,
  ) {}

  create(user: User, createDebtDTO: CreateDebtDto): Promise<Debt> {
    return this.debtsRepository.save({
      user,
      ...createDebtDTO,
    });
  }

  async update(
    user: User,
    id: number,
    body: UpdateDebtDto,
  ): Promise<Debt | null> {
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
