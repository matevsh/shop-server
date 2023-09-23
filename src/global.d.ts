import 'express-session';

type UserSession = {
  uuid: string;
};

declare module 'express-session' {
  interface SessionData {
    user: UserSession;
  }
}
