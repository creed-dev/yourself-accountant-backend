import { Module } from '@nestjs/common';
import { CommonModule } from './modules/common/common.module';
import { ApiModule } from './modules/api/api.module';

@Module({
  imports: [CommonModule, ApiModule],
})
export class AppModule {}
