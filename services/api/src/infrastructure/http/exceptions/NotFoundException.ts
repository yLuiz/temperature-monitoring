import { HttpStatus } from "../enums/HttpStatus";
import { HttpStatusCode } from "../enums/HttpStatusCode";
import { HttpException } from "./HttpException";

export class NotFoundException extends HttpException {
    constructor(message = 'Not Found') {
        super(message, HttpStatusCode.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
}