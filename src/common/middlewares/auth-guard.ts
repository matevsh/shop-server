import type { Request, Response, NextFunction } from 'express';
import { $checkToken } from '@/common/utils/check-token';
import { $response } from '>/response';
import { httpCodes } from '>/http-codes';

export async function authGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  const result = await $checkToken(token, refreshToken, res);

  req.cookies.accessToken = result;

  const response = $response(httpCodes.unauthorized);
  result ? next() : res.status(response.httpStatus).json(response);
}
