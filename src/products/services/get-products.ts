import { prisma } from '~/database/client';

export function getProducts() {
  return prisma.item.findMany({});
}
