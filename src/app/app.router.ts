import { Router } from 'express';
import { authRouter } from '~/auth';
import { productsRouter } from '~/products';
import { shopRouter } from '~/shop';
import { logsRouter } from '~/logs';

export const appRouter = Router();

appRouter.use('/auth', authRouter);

appRouter.use('/product', productsRouter);

appRouter.use('/shop', shopRouter);

appRouter.use('/log', logsRouter);
