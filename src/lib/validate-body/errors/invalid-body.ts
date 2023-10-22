import { ValidateBodyError } from '>/validate-body/errors/base';

export class InvalidBodyError extends ValidateBodyError {
  constructor(
    message: string,
    public readonly cause: string
  ) {
    super(message);
    this.name = 'InvalidBodyError';
  }
}
