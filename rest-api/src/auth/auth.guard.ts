import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const httpCtx = context.switchToHttp();
    const request = httpCtx.getRequest<Request>();
    const user = request['user'];

    if (!user) {
      console.log('User not authenticated, denying access');
      throw new UnauthorizedException();
    }

    console.log('User is authenticated, allowing access');
    return true;
  }
}
