import { HttpStatus } from "../enums/HttpStatus";
import { HttpStatusCode } from "../enums/HttpStatusCode";
import { HttpException } from "./HttpException";

export class InternalServerErrorException extends HttpException {
    constructor(message = 'Internal Server Error', status = HttpStatus.INTERNAL_SERVER_ERROR) {
        super(message, HttpStatusCode.INTERNAL_SERVER_ERROR, status);
    }
}