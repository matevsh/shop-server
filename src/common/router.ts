import { Router } from 'express';
import { appRouter } from '@/app';

export const router = Router();

router.use(appRouter);
