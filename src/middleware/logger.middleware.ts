import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as log4js from 'log4js';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    log4js.configure({
      appenders: { 
        app: { type: "file", filename: "app.log" },
        out: {type: 'stdout'} 
      },
      categories: { 
         default: { 
          appenders: ["app", "out"], 
          level: "info" } },
    });

    const logger = log4js.getLogger();

      const requestBody = { ...req.body };

      const finalRequest = {
        method: req.method,
        url: req.url,
        body: requestBody
      }
      logger.info('Request:', finalRequest);

    next();

    // res.on('finish', () => {
    //   logger.info('Response', {
    //     status: res.status,
    //     body: res.body,
    //   });
    // });
  }
}

