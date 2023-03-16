import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request } from 'express';
import { LoggerService } from 'src/modules/logger/logger.service';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const { originalUrl, method } = ctx.getRequest<Request>();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorMessage =
      exception instanceof HttpException
        ? exception.getResponse()['message']
        : 'Internal Server Error';

    const responseBody = {
      statusCode: httpStatus,
      message: errorMessage,
      timestamp: new Date().toLocaleString(),
    };

    this.loggerService.error(
      `Request: 
      METHOD: ${method}
      URL: ${originalUrl}
      RESPONSE STATUS: ${httpStatus}
      ERROR MESSAGE: ${exception.toString()}`,
    );

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
