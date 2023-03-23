import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { AppModule } from './app.module';
import { LoggerService } from './modules/logger/logger.service';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: false,
    bufferLogs: true,
  });

  app.use(cookieParser());

  app.useLogger(app.get(LoggerService));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const file = readFileSync(join('.', 'doc', 'api.yaml'), 'utf-8');
  const document = parse(file);
  SwaggerModule.setup('/doc', app, document);

  await app.listen(PORT);
}
bootstrap();
