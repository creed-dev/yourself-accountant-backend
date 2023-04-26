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
import { JwtAuthGuard } from '../../common/jwt/jwt-auth.guard';
import { DebtsService } from './debts.service';
import { RequestWithUser } from '../../../interfaces/request-with-user';
import { Debt } from '../../../database/entities/debt';
import { CreateDebt } from './dto/create-debt';
import { UpdateDebt } from './dto/update-debt';

@UseGuards(JwtAuthGuard)
@Controller('debts')
export class DebtsController {
  constructor(private debtsService: DebtsService) {}

  @Post('create')
  create(
    @Request() req: RequestWithUser,
    @Body() body: CreateDebt,
  ): Promise<Debt> {
    return this.debtsService.create(req.user, body);
  }

  @Patch('update/:id')
  update(
    @Request() req: RequestWithUser,
    @Param('id') id: number,
    @Body() body: UpdateDebt,
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
