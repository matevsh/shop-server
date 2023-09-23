import { Router } from 'express';
import { loginController, registerController } from '~/admin/admin.controller';

export const adminRouter = Router();

adminRouter.post('/login', loginController);

adminRouter.post('/register', registerController);
