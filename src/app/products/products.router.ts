import { Router } from 'express';
import {
  createProductController,
  getProductByIdController,
  getProductsController,
} from '~/products';
import { adminGuard } from '@/common/middlewares/admin-guard';

export const productsRouter = Router();

productsRouter.post('/create', adminGuard, createProductController);

productsRouter.get('/', getProductsController);

productsRouter.get('/:id', getProductByIdController);
