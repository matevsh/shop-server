import { Router } from 'express';
import { adminGuard } from '@/common/middlewares/admin-guard';
import { getLogsController } from '~/logs/log.controller';

export const logsRouter = Router();

logsRouter.get('/', adminGuard, getLogsController);
