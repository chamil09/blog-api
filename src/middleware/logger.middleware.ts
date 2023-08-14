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

    const reqLogger = log4js.getLogger();

      const requestBody = { ...req.body };

      const finalRequest = {
        method: req.method,
        url: req.url,
        body: requestBody
      }
      reqLogger.info('Request:', finalRequest);
    next();
  }
}

const getResponseLog = (res: Response) => {
  const resLogger = log4js.getLogger();
  const rawResponse = res.write;
  const rawResponseEnd = res.end;
  const chunkBuffers = [];
  res.write = (...chunks) => {
    const resArgs = [];
    for (let i = 0; i < chunks.length; i++) {
      resArgs[i] = chunks[i];
      if (!resArgs[i]) {
        res.once('drain', res.write);
        i--;
      }
    }
    if (resArgs[0]) {
      chunkBuffers.push(Buffer.from(resArgs[0]));
    }
    return rawResponse.apply(res, resArgs);
  };

  res.end = (...chunk) => {
    const resArgs = [];
    for (let i = 0; i < chunk.length; i++) {
      resArgs[i] = chunk[i];
    }
    if (resArgs[0]) {
      chunkBuffers.push(Buffer.from(resArgs[0]));
    }
    const body = Buffer.concat(chunkBuffers).toString('utf8');

    resLogger.info('Response:', body);
    rawResponseEnd.apply(res, resArgs);
    return body as unknown as Response;
  };
};