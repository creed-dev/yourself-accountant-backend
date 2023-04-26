import { IsDateString, IsNumber } from 'class-validator';

export class UpdateDebtDto {
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
