import { z } from 'zod';

export const createCategoryBody = z.object({
  name: z.string(),
  shopId: z.string(),
});

export type CreateCategoryBody = z.infer<typeof createCategoryBody>;
