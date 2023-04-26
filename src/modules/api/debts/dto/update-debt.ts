import { IsDateString, IsNumber } from 'class-validator';

export class UpdateDebt {
  @IsNumber(
    {},
    {
      message: 'Сумма обязятельна',
    },
  )
  amount: number;

  @IsDateString({
    message: 'Дата обязательна',
  })
  date: Date;
}
