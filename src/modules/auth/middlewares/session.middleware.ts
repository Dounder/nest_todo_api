import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { getIronSession } from 'iron-session';
import { sessionConfig } from 'src/config';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    req.session = await getIronSession(req, res, sessionConfig);
    next();
  }
}
