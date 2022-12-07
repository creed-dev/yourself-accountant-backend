import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import * as path from 'path';

config();

const configService = new ConfigService();

const entitiesPath: string = path.join(
  __dirname,
  'database',
  'entities',
  '*.entity.{js,ts}',
);

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USER'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      entities: [entitiesPath],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
