import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Debt } from '../../../database/entities/debt.entity';
import { DebtsController } from './debts.controller';
import { DebtsService } from './debts.service';
import { JwtModule } from '../../common/jwt/jwt.module';

@Module({
  imports: [TypeOrmModule.forFeature([Debt]), JwtModule],
  controllers: [DebtsController],
  providers: [DebtsService],
  exports: [],
})
export class DebtsModule {}
