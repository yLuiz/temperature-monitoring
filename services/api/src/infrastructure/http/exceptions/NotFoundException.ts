import { HttpStatus } from "../enums/HttpStatus";
import { HttpStatusCode } from "../enums/HttpStatusCode";
import { HttpException } from "./HttpException";

export class NotFoundException extends HttpException {
    constructor(message = 'Not Found', status = HttpStatus.NOT_FOUND) {
        super(message, HttpStatusCode.NOT_FOUND, status);
    }
}