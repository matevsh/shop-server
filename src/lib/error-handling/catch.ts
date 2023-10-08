import type { Request, Response } from 'express';
import { checkError } from '~/lib/error-handling/check-error';
import type { HttpResponse } from '~/lib/response/types';

export function $catch<R extends Request>(
  fn: (req: Request, res: Response) => HttpResponse | Promise<HttpResponse>
) {
  return async (req: Request, res: Response) => {
    try {
      const response = await fn(req as R, res);
      res.status(response.httpStatus).json(response);
    } catch (e) {
      const err = await checkError(e);
      res.status(err.httpStatus).json(err);
    }
  };
}
