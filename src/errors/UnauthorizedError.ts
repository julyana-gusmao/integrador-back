import { BaseError } from "./BaseError";

export class UnauthorizedError extends BaseError {
    constructor(message: string){
        super(401, message)
    }
}