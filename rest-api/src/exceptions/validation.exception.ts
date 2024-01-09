import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationException extends BadRequestException {
  public statusCode = 400;

  constructor(public validationErrors: string[]) {
    super();
  }

  public static fromValidationErrors(errors: ValidationError[]) {
    const messages = errors.map(
      ({ property, value, constraints }) =>
        `${property} has wrong value '${value}', ${Object.values(
          constraints,
        ).join(', ')}`,
    );

    return new ValidationException(messages);
  }
}
