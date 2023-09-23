import { Router } from 'express';
import { adminRouter } from '~/admin/admin.router';
import { productsRouter } from '~/products/products.router';

export const router = Router();

router.use('/admin', adminRouter);

router.use('/product', productsRouter);
