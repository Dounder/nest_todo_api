import { IronSession, IronSessionData } from 'iron-session';

declare module 'express' {
  interface Request {
    session: IronSession<IronSessionData>;
  }
}
