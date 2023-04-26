import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

config();

const configService: ConfigService = new ConfigService();

const entitiesPath: string = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'database',
  'entities',
  '*.entity.{js,ts}',
);

const typeOrmConfig: DynamicModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [entitiesPath],
  synchronize: false,
});

@Module({
  imports: [typeOrmConfig],
  exports: [typeOrmConfig],
})
export class DatabaseModule {}
