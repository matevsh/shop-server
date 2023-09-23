import { z } from 'zod';
import 'dotenv/config';
import * as process from 'process';

const envSchema = z.object({
  PORT: z.coerce.number(),
  SESSION_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
