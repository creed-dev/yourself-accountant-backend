import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();

const configService: ConfigService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    cors({
      origin: configService.get('CORS_ORIGIN'),
    }),
  );
  await app.listen(3000);
}

bootstrap();
