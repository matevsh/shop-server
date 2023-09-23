export class ValidateBodyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidateBodyError';
  }
}
