import { prisma } from '~/database/client';

export async function createProduct(title: string, price: number) {
  return await prisma.item.create({
    data: { price, title },
  });
}
