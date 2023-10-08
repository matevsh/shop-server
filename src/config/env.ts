import { z } from 'zod';
import 'dotenv/config';
import * as process from 'process';

const envSchema = z.object({
  PORT: z.coerce.number(),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
