import { z } from 'zod';

export const createProductSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number().positive(),
  imageBase64: z.string().optional(),
  shopId: z.string(),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
