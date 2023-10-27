import { Router } from 'express';
import {
  getShopsController,
  createShopController,
} from '~/shop/shop.controller';
import { adminGuard } from '@/common/middlewares/admin-guard';

export const shopRouter = Router();

shopRouter.get('/', getShopsController);

shopRouter.post('/create', adminGuard, createShopController);
