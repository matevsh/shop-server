import { prisma } from '@/database/client';
import type { CreateProductSchema } from '~/products/models/create-product';

export async function createProduct(productData: CreateProductSchema) {
  const { price, title, imageBase64, shopId, description } = productData;

  return prisma.product.create({
    data: {
      price,
      title,
      description,
      imageBase64,
      shop: { connect: { id: shopId } },
    },
  });
}
