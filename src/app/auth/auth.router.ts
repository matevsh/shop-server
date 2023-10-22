import { Router } from 'express';
import {
  loginController,
  logoutController,
  registerController,
  sessionController,
} from '~/auth/auth.controller';
import { guestOnly } from '@/common/middlewares/guest-only';

export const authRouter = Router();

authRouter.post('/login', guestOnly, loginController);

authRouter.post('/register', guestOnly, registerController);

authRouter.get('/session', sessionController);

authRouter.get('/logout', logoutController);
