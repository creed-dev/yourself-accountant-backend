import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DebtsModule } from './debts/debts.module';

@Module({
  imports: [UsersModule, DebtsModule],
})
export class ApiModule {}
