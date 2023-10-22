import type { Request, Response, NextFunction } from 'express';
import { $checkToken } from '@/common/utils/check-token';

export async function authGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  const result = await $checkToken(token, refreshToken, res);

  req.cookies.accessToken = result;

  result && next();
}
