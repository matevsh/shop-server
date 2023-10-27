import type { CreateCategoryBody } from '~/category/models/create-category';
import { prisma } from '@/database/client';

export async function createCategory(categoryData: CreateCategoryBody) {
  const { name, shopId } = categoryData;

  await prisma.category.create({
    data: { name, shop: { connect: { id: shopId } } },
  });
}
