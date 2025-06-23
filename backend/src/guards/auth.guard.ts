import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const session = request.session || {};
    const userId = session.userId;
    return userId;
    // if (!userId) {
    //   return false;
    // }

    // return true; // User is authenticated
  }
}
