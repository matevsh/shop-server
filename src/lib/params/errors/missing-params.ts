export class MissingParamsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MissingParamsError';
  }
}
