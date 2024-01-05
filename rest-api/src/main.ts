import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http.filter';
import { FallbackExceptionFilter } from './filters/fallback.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  (await NestFactory.create(AppModule))
    .setGlobalPrefix('api')
    .useGlobalFilters(new FallbackExceptionFilter(), new HttpExceptionFilter())
    .useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }))
    .listen(9000);
}

bootstrap();
