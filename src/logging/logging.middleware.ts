import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const body = JSON.stringify(req.body);
    const query = JSON.stringify(req.query);
    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - startTime;
      this.loggingService.log(
        `Method: ${method}, URL: ${originalUrl}, Body: ${body}, Query: ${query}, Status: ${statusCode}, Duration: ${duration}ms`,
      );
    });

    next();
  }
}
