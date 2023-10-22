import type { CreateShopBody } from '~/shop/models/create-shop-body';
import { prisma } from '@/database/client';

export async function createShop(shopBody: CreateShopBody) {
  const { name, userId, imageBase64 } = shopBody;

  return await prisma.shop.create({
    data: { name, imageBase64, user: { connect: { id: userId } } },
  });
}
