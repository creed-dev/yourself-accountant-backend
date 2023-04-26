import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateDebt {
  @IsString({
    message: 'Имя обязательно',
  })
  name: string;

  @IsNumber(
    {},
    {
      message: 'Сумма обязятельна',
    },
  )
  amount: number;

  @IsNumber(
    {},
    {
      message: 'Тип обязателен',
    },
  )
  type: number;

  @IsDateString({
    message: 'Дата обязательна',
  })
  date: Date;
}
