import { z } from 'zod';

export const loginBody = z.object({
  name: z.string(),
  key: z.string(),
});

export type LoginBody = z.infer<typeof loginBody>;
