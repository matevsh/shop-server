import { env } from './env';
import express from 'express';
import session from 'express-session';
import { router } from '~/common/router';
import { YEAR_MS } from '~/common/constants/time';

export function bootstrap(app: express.Express) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    session({
      secret: env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: YEAR_MS,
      },
    })
  );

  app.use(router);

  app.listen(env.PORT, () => {
    console.log(
      `${new Date().toLocaleString()} | http://localhost:${env.PORT}`
    );
  });
}
