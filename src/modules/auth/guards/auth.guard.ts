import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const session = request.session;

    // Check if user is authenticated
    if (!session.user) {
      throw new UnauthorizedException('You must be logged in to access this resource');
    }

    // Attach user to request for easy access in controllers
    request.user = session.user;

    return true;
  }
}
