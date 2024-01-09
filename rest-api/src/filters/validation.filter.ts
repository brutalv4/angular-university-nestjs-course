import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ValidationException } from '../exceptions/validation.exception';

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter<ValidationException> {
  catch(
    { validationErrors, statusCode }: ValidationException,
    host: ArgumentsHost,
  ): any {
    return host
      .switchToHttp()
      .getResponse<Response>()
      .status(statusCode)
      .json({
        statusCode,
        validationErrors,
        createdBy: 'ValidationFilter',
      });
  }
}
