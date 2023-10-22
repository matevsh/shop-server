import type { NextFunction, Request, Response } from 'express';
import { $response } from '>/response';
import { httpCodes } from '>/http-codes';
import { $verify } from '>/jwt/jwt';
import type { Session } from '@/common/types/session';
import { prisma } from '@/database/client';
import { $checkToken } from '@/common/utils/check-token';

export async function adminGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  const accessToken = await $checkToken(token, refreshToken, res);

  const unauthorized = $response(httpCodes.unauthorized);

  if (!accessToken)
    return res.status(unauthorized.httpStatus).json(unauthorized);

  const { result, error } = $verify<Session>(accessToken);
  if (error) return res.status(unauthorized.httpStatus).json(unauthorized);

  const user = await prisma.user.findFirst({
    where: { id: result.uuid },
  });

  if (!user) return res.status(unauthorized.httpStatus).json(unauthorized);

  const forbidden = $response(httpCodes.forbidden);
  const { isAdmin } = user;
  if (!isAdmin) return res.status(forbidden.httpStatus).json(forbidden);

  next();
}
