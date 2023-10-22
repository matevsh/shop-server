import { Router } from 'express';
import { authRouter } from '~/auth/auth.router';
import { productsRouter } from '~/products/products.router';
import { shopRouter } from '~/shop/shop.router';
export const appRouter = Router();

appRouter.use('/auth', authRouter);

appRouter.use('/product', productsRouter);

appRouter.use('/shop', shopRouter);
