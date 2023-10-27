import type { RegisterBody } from '~/auth/models/register-body';
import { prisma } from '@/database/client';
import bcrypt from 'bcrypt';
import * as crypto from 'crypto';

export async function createUser(user: RegisterBody) {
  const keyString = crypto.randomUUID();

  const keyHash = await bcrypt.hash(keyString, 10);

  await prisma.user.create({
    data: {
      name: user.name,
      keyString: keyHash,
    },
  });
  return keyString;
}
