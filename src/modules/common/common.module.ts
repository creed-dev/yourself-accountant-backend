import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [DatabaseModule, JwtModule],
})
export class CommonModule {}
