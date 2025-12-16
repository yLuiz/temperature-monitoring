import { HttpStatus } from "../enums/HttpStatus";
import { HttpStatusCode } from "../enums/HttpStatusCode";

export class HttpException extends Error {
  public readonly statusCode: number;
  public readonly status: string;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR,
    status = HttpStatus.INTERNAL_SERVER_ERROR,
    isOperational = true
  ) {
    super(message);

    this.statusCode = statusCode;
    this.status = status;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}
