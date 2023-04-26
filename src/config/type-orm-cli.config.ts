import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import * as path from 'path';

config();

const configService = new ConfigService();

const entitiesPath: string = path.join(
  __dirname,
  '..',
  '..',
  'dist',
  'database',
  'entities',
  '*{ .ts,.js}',
);

const migrationsPath: string = path.join(
  __dirname,
  '..',
  '..',
  'dist',
  'database',
  'migrations',
  '*{ .ts,.js}',
);

export default new DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [entitiesPath],
  migrations: [migrationsPath],
});
