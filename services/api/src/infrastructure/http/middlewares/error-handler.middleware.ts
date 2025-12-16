import { Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';
import { logger } from '../../logger/logger';
import { HttpStatus } from '../enum/HttpStatus';
import { HttpStatusCode } from '../enum/HttpStatusCode';

interface ErrorResponse {
  statusCode: number;
  status: string;
  message: string;
  traceId?: string;
  timestamp: string;
}

export function errorHandler(err: Error, req: Request, res: Response, next: Function) {
  const log = req.log || logger;

  if (err instanceof HttpException) {

    logger.info({ err, traceId: req.traceId }, 'HttpException occurred');

    log.warn({
      statusCode: err.statusCode,
      status: err.status,
      message: err.message,
      traceId: req.traceId,
    }, 'HttpException');

    const response: ErrorResponse = {
      statusCode: err.statusCode,
      status: err.status,
      message: err.message,
      traceId: req.traceId,
      timestamp: new Date().toISOString(),
    };

    return res.status(err.statusCode).json(response);
  }

  // Unhandled error
  log.error({ err, traceId: req.traceId }, 'Unhandled error');

  const response: ErrorResponse = {
    statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Internal server error',
    traceId: req.traceId,
    timestamp: new Date().toISOString(),
  };

  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(response);
}
