import { prisma } from '@/database/client';

export function getCategories() {
  return prisma.category.findMany({});
}
