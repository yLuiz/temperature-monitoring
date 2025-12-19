import { HttpStatus } from '../enums/HttpStatus';
import { HttpStatusCode } from '../enums/HttpStatusCode';
import { HttpException } from './HttpException';

export class BadRequestException extends HttpException {
    constructor(message = 'Bad Request') {
        super(message, HttpStatusCode.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
}
