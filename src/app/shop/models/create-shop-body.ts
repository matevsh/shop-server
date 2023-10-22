import { z } from 'zod';

export const createShopBody = z.object({
  name: z.string().min(3).max(255),
  imageBase64: z.string().optional(),
});

export type CreateShopBody = z.infer<typeof createShopBody> & {
  userId: string;
};
