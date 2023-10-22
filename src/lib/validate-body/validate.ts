import { ZodError } from 'zod';
import type { Request, Response } from 'express';
import type { ZodType } from 'zod';
import { $catch } from '>/error-handling/catch';
import { InvalidBodyError } from '>/validate-body/errors/invalid-body';
import { UnknownParsingError } from '>/validate-body/errors/unknown';
import { ValidateBodyError } from '>/validate-body/errors/base';
import type { HttpResponse } from '>/response/types';

type TypedRequest<T> = {
  body: T;
} & Omit<Request, 'body'>;

function validate<T>(
  schema: ZodType<T>,
  fn: (
    req: TypedRequest<T>,
    res: Response
  ) => HttpResponse | Promise<HttpResponse>
) {
  return async (req: Request, res: Response) => {
    try {
      req.body = schema.parse(req.body);
      return await fn(req as TypedRequest<T>, res);
    } catch (e) {
      if (e instanceof ZodError) {
        throw new InvalidBodyError(e.message, JSON.stringify(e.flatten()));
      } else if (e instanceof ValidateBodyError) {
        throw new UnknownParsingError(e.message);
      } else {
        throw e;
      }
    }
  };
}

export const $validate = <T>(
  schema: ZodType<T>,
  fn: (
    req: TypedRequest<T>,
    res: Response
  ) => HttpResponse | Promise<HttpResponse>
) => {
  return $catch(validate(schema, fn));
};
