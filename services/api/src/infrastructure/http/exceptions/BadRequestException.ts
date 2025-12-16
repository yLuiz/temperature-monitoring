import { HttpStatus } from '../enum/HttpStatus';
import { HttpStatusCode } from '../enum/HttpStatusCode';
import { HttpException } from './HttpException';

export class BadRequestException extends HttpException {
    constructor(message = 'Bad Request', status = HttpStatus.BAD_REQUEST) {
        super(message, HttpStatusCode.BAD_REQUEST, status);
    }
}
