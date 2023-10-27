import { Router } from 'express';
import {
  createCategoryController,
  getCategoriesController,
} from '~/category/category.controller';
import { adminGuard } from '@/common/middlewares/admin-guard';

export const categoryRouter = Router();

categoryRouter.get('/', getCategoriesController);

categoryRouter.post('/create', adminGuard, createCategoryController);
