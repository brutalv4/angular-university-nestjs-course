import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log(
      `HTTP exception handler triggered ${JSON.stringify(exception)}`,
    );

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    return response.status(status).json({
      status,
      createdBy: 'HttpExceptionFilter',
      errorMessage: exception.message.message,
    });
  }
}
