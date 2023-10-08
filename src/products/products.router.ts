import { Router } from 'express';
import {
  createProductController,
  getProductsController,
} from '~/products/products.controller';
import { adminGuard } from '~/common/middlewares/admin-guard';

export const productsRouter = Router();

productsRouter.post('/create', adminGuard, createProductController);

productsRouter.get('/', getProductsController);
