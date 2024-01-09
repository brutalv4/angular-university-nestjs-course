import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { ValidationException } from './exceptions/validation.exception';
import { FallbackExceptionFilter } from './filters/fallback.filter';
import { HttpExceptionFilter } from './filters/http.filter';
import { ValidationFilter } from './filters/validation.filter';

async function bootstrap() {
  (await NestFactory.create(AppModule))
    .setGlobalPrefix('api')
    .useGlobalFilters(
      new FallbackExceptionFilter(),
      new HttpExceptionFilter(),
      new ValidationFilter(),
    )
    .useGlobalPipes(
      new ValidationPipe({
        skipMissingProperties: true,
        exceptionFactory: ValidationException.fromValidationErrors,
      }),
    )
    .listen(process.env.PORT || 9000);
}

bootstrap();
