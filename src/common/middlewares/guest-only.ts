import type { Response, Request, NextFunction } from 'express';
import { $response } from '>/response';
import { httpCodes } from '>/http-codes';
import { $checkToken } from '@/common/utils/check-token';

export async function guestOnly(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  const accessToken = await $checkToken(token, refreshToken, res);

  const response = $response(httpCodes.forbidden);

  if (accessToken) return res.status(response.httpStatus).json(response);
  else next();
}
