import { $validate } from '>/validate-body';
import { $response } from '>/response';
import { httpCodes } from '>/http-codes';
import { loginBody } from '~/auth/models/login.body';
import { registerBody } from '~/auth/models/register-body';
import { createUser } from '~/auth/services/create-user';
import { prisma } from '@/database/client';
import { $catch } from '>/error-handling/catch';
import { $login, $verify } from '>/jwt/jwt';
import type { Session } from '@/common/types/session';
import { compare } from 'bcrypt';
import { $checkToken } from '@/common/utils/check-token';

export const loginController = $validate(loginBody, async (req, res) => {
  const user = await prisma.user.findFirst({
    where: {
      name: req.body.name,
    },
  });

  if (!user) return $response(httpCodes.not_found);

  const compareResult = await compare(req.body.key, user.keyString);
  if (!compareResult)
    return $response(httpCodes.bad_request, {
      message: 'Invalid credentials',
    });

  const { refreshToken } = $login(res, { uuid: user.id });

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: refreshToken,
      ip: req.ip,
    },
  });

  return $response(httpCodes.ok);
});

export const registerController = $validate(registerBody, async (req) => {
  const keyString = await createUser(req.body);

  return $response(httpCodes.ok, {
    data: { keyString },
  });
});

export const sessionController = $catch(async (req, res) => {
  const token = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  const accessToken = await $checkToken(token, refreshToken, res);
  if (!accessToken) return $response(httpCodes.unauthorized);

  const { result: session, error } = $verify<Session>(accessToken);
  if (error) return $response(httpCodes.unauthorized);

  const user = await prisma.user.findFirst({
    where: { id: session.uuid },
  });

  if (!user) return $response(httpCodes.not_found);

  const { keyString: _keyString, ...responseUser } = user;

  return $response(httpCodes.ok, {
    data: responseUser,
  });
});

export const logoutController = $catch(async (req, res) => {
  const token = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  const accessToken = await $checkToken(token, refreshToken, res);
  if (!accessToken) return $response(httpCodes.bad_request);

  await prisma.refreshToken.update({
    where: { token: refreshToken },
    data: { enabled: false },
  });

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  return $response(httpCodes.ok);
});
