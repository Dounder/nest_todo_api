import { CanActivate, ExecutionContext, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  readonly _logger = new Logger(AuthGuard.name);

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const session = request.session;

    // Check if user is authenticated
    if (!session.user) {
      this._logger.warn('Unauthorized access attempt detected.');
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'You must be logged in to access this resource',
      });
    }

    // Attach user to request for easy access in controllers
    request.user = session.user;

    return true;
  }
}
