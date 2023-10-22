import { ValidateBodyError } from '>/validate-body/errors/base';

export class UnknownParsingError extends ValidateBodyError {
  constructor(message: string) {
    super(message);
    this.name = 'UnknownParsingError';
  }
}
