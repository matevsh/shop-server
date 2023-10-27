import { prisma } from '@/database/client';
import type { CreateProductSchema } from '~/products/models/create-product';

export async function createProduct(productData: CreateProductSchema) {
  const { price, title, imageBase64, categoryId, description } = productData;

  return prisma.product.create({
    data: {
      price,
      title,
      description,
      imageBase64,
      category: { connect: { id: categoryId } },
    },
  });
}
