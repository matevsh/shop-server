import type { Response } from 'express';
import type { Session } from '@/common/types/session';
import { prisma } from '@/database/client';
import { $accessToken, $verify, $verifyRefresh } from '>/jwt';

export const $checkToken = async (
  token: string,
  refreshToken: string,
  res: Response
): Promise<string | undefined> => {
  const { error: tokenError } = $verify(token);
  if (!tokenError) return token;

  const { error: refreshTokenErr, result: refreshTokenData } =
    $verifyRefresh<Session>(refreshToken);
  if (refreshTokenErr) {
    return;
  }

  const findToken = await prisma.refreshToken
    .findFirst({
      where: { token: refreshToken, enabled: true },
    })
    .catch(() => undefined);
  if (!findToken) {
    return;
  }

  const newAccessToken = $accessToken({ uuid: refreshTokenData?.uuid });
  res.cookie('accessToken', newAccessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  return newAccessToken;
};
