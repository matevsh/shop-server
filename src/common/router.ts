import { Router } from 'express';
import { authRouter } from '~/auth/auth.router';
import { productsRouter } from '~/products/products.router';

export const router = Router();

router.use('/auth', authRouter);

router.use('/product', productsRouter);
