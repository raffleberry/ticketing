import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  constructor(public errors: ValidationError[]) {
    super('Invalid request params');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  statusCode = 400;

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
