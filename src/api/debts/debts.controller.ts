import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/auth/guards/jwt-auth.guard';
import { DebtsService } from './debts.service';
import { RequestWithUser } from '../../common/auth/interfaces/request-with-user.interface';
import { Debt } from '../../database/entities/debt.entity';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';

@UseGuards(JwtAuthGuard)
@Controller('debts')
export class DebtsController {
  constructor(private debtsService: DebtsService) {}

  @Post('create')
  create(
    @Request() req: RequestWithUser,
    @Body() body: CreateDebtDto,
  ): Promise<Debt> {
    return this.debtsService.create(req.user, body);
  }

  @Patch('update/:id')
  update(
    @Request() req: RequestWithUser,
    @Param('id') id: number,
    @Body() body: UpdateDebtDto,
  ): Promise<Debt | null> {
    return this.debtsService.update(req.user, id, body);
  }

  @Delete('delete/:id')
  delete(
    @Request() req: RequestWithUser,
    @Param('id') id: number,
  ): Promise<Debt | null> {
    return this.debtsService.delete(req.user, id);
  }
}
