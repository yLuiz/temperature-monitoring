import { HttpStatus } from "../enum/HttpStatus";
import { HttpStatusCode } from "../enum/HttpStatusCode";
import { HttpException } from "./HttpException";

export class NotFoundException extends HttpException {
    constructor(message = 'Not Found', status = HttpStatus.NOT_FOUND) {
        super(message, HttpStatusCode.NOT_FOUND, status);
    }
}