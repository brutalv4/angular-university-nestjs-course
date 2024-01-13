import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private allowedRoles: string[]) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const httpCtx = context.switchToHttp();
    const request = httpCtx.getRequest<Request>();

    const user = request['user'];
    const allowed = this.isAllowed(user.roles);

    console.log('User is allowed', allowed);

    if (!allowed) {
      console.log(
        'User is authenticated but not authorized, denying access...',
      );
      throw new ForbiddenException();
    }

    console.log('User authorized, allowing access');
    return true;
  }

  isAllowed(userRoles: string[]): boolean {
    console.log('Comparing roles: ', this.allowedRoles, userRoles);

    let allowed = false;
    userRoles.forEach(userRole => {
      console.log('Checking if role is allowed', userRole);

      if (!allowed && this.allowedRoles.includes(userRole)) {
        allowed = true;
      }
    });

    return allowed;
  }
}
