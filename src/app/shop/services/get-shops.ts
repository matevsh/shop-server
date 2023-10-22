import { prisma } from '@/database/client';

export function getShops() {
  return prisma.shop.findMany({});
}
