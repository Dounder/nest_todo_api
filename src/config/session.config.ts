import { SessionOptions } from 'iron-session';
import { envs } from './envs.config';

export const sessionConfig: SessionOptions = {
  password: envs.sessionSecret,
  cookieName: envs.sessionCookieName,
  cookieOptions: {
    secure: envs.isProd,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: envs.sessionCookieMaxAge, // 7 days
    path: '/',
  },
};
