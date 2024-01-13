import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class GetUserMiddleware implements NestMiddleware<Request, Response> {
  use(req: Request, res: Response, next: () => void) {
    const authJwtToken = req.headers.authorization;

    if (!authJwtToken) {
      next();
      return;
    }

    try {
      const user = jwt.verify(authJwtToken, process.env.JWT_SECRET);

      if (user) {
        console.log('Found user details in JWT: ', user);
        req['user'] = user;
      }
    } catch (err) {
      console.log('Error handling authentication JWT: ', err);
    }

    next();
  }
}
