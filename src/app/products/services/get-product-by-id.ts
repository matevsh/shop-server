import { prisma } from '@/database/client';

export function getProductById(id: string | undefined) {
  if (!id) return undefined;

  return prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      shop: true,
    },
  });
}
