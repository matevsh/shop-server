import jwt from 'jsonwebtoken';
import { env } from '~/config/env';
import type { Response } from 'express';
import type { Session } from '~/common/types/session';
import { $response } from '~/lib/response';
import { httpCodes } from '~/lib/http-codes';
import { prisma } from '~/database/client';

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = env;

export const $accessToken = <T extends object | string>(data: T) => {
  return jwt.sign(data, ACCESS_TOKEN_SECRET, {
    expiresIn: '30s',
  });
};

export const $refreshToken = <T extends object | string>(data: T) => {
  return jwt.sign(data, REFRESH_TOKEN_SECRET, {
    expiresIn: '864000s',
  });
};

export const $verify = <T = string>(token: string) => {
  let result: T, error: boolean;
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    result = decoded as T;
    err ? (error = true) : (error = false);
  });
  // @ts-expect-error result, error is always defined
  return { result, error };
};

export const $verifyRefresh = <T = string>(token: string) => {
  let result: T, error: boolean;
  jwt.verify(token, REFRESH_TOKEN_SECRET, (err, decoded) => {
    result = decoded as T;
    err ? (error = true) : (error = false);
  });
  // @ts-expect-error result, error is always defined
  return { result, error };
};

export const $login = <T extends object>(res: Response, data: T) => {
  const accessToken = $accessToken(data);
  const refreshToken = $refreshToken(data);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000, // 1 hour
  });
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    maxAge: 6 * 30 * 24 * 60 * 60 * 1000, // half a year
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const $checkSession = async (
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

  const newAccessToken = $accessToken({ uuid: refreshTokenData.uuid });
  res.cookie('accessToken', newAccessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  return newAccessToken;
};
