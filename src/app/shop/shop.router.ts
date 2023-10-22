import { Router } from 'express';
import { createShopController } from '~/shop';
import { getShopsController } from '~/shop/shop.controller';
import { authGuard } from '@/common/middlewares/auth-guard';

export const shopRouter = Router();

shopRouter.get('/', getShopsController);

shopRouter.post('/create', authGuard, createShopController);
