import { HttpStatus } from '../enums/HttpStatus';
import { HttpStatusCode } from '../enums/HttpStatusCode';
import { HttpException } from './HttpException';

export class BadRequestException extends HttpException {
    constructor(message = 'Bad Request', status = HttpStatus.BAD_REQUEST) {
        super(message, HttpStatusCode.BAD_REQUEST, status);
    }
}
