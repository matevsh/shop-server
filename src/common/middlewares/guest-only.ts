import type { Response, Request, NextFunction } from 'express';
import { $checkSession } from '~/lib/jwt/jwt';
import { $response } from '~/lib/response';
import { httpCodes } from '~/lib/http-codes';

export async function guestOnly(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  const accessToken = await $checkSession(token, refreshToken, res);

  const response = $response(httpCodes.forbidden);

  if (accessToken) return res.status(response.httpStatus).json(response);
  else next();
}
