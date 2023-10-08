import { z } from 'zod';

export const registerBody = z.object({
  name: z.string(),
});

export type RegisterBody = z.infer<typeof registerBody>;
