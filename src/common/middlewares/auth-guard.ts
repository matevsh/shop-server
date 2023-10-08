import type { Request, Response, NextFunction } from 'express';
import { $checkSession } from '~/lib/jwt/jwt';

export async function authGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  const result = await $checkSession(token, refreshToken, res);

  result && next();
}
