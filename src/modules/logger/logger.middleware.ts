import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private loggerService: LoggerService) {
    this.loggerService.setContext('HTTP');
  }

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, originalUrl, method } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');

      const message = `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`;
      this.loggerService.log(message);
    });

    next();
  }
}
