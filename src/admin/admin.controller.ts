import { z } from 'zod';
import * as crypto from 'crypto';
import type { Request, Response } from 'express';
import { prisma } from '~/database/client';
import { $validate } from '~/lib/validate-body';
import { response } from '~/lib/response';
import { httpCodes } from '~/lib/http-codes';

export function loginController(req: Request, res: Response) {
  console.log(req.body, 'chuj');
  res.json('jp');
}

const registerBody = z.object({
  name: z.string(),
});

export const registerController = $validate(registerBody, async (req) => {
  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      keyString: crypto.randomUUID(),
    },
  });

  return response(httpCodes.ok, {
    data: user,
  });
});
