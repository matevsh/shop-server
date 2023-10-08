import { z } from 'zod';

export const createProductSchema = z.object({
  title: z.string(),
  price: z.number().positive(),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
