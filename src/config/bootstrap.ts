import cookieParser from 'cookie-parser';
import { router } from '@/common/router';
import express from 'express';
import { env } from './env';
import cors from 'cors';

export function bootstrap(app: express.Express) {
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());

  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000',
    })
  );

  app.use(router);

  app.listen(env.PORT, () => {
    console.log(
      `${new Date().toLocaleString()} | http://localhost:${env.PORT}`
    );
  });
}
