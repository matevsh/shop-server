import jwt from 'jsonwebtoken';
import { env } from '@/config/env';
import type { Response } from 'express';

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

export const $verify = <T = string>(token: string = '') => {
  let result: T, error: boolean;
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    result = decoded as T;
    err ? (error = true) : (error = false);
  });
  // @ts-expect-error result, error is always defined
  return { result, error };
};

export const $verifyRefresh = <T = string>(token: string = '') => {
  if (!token) return { error: true };

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
    maxAge: 6 * 30 * 24 * 60 * 60 * 1000, // half a year
    domain: 'localhost',
  });
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000, // 1 hour
    domain: 'localhost',
  });

  return {
    accessToken,
    refreshToken,
  };
};
