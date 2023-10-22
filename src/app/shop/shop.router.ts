import { Router } from 'express';
import {
  getShopsController,
  createShopController,
} from '~/shop/shop.controller';
import { authGuard } from '@/common/middlewares/auth-guard';

export const shopRouter = Router();

shopRouter.get('/', getShopsController);

shopRouter.post('/create', authGuard, createShopController);
