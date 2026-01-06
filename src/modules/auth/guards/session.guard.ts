import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SessionGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Call the parent canActivate to trigger Passport's local strategy
    const result = (await super.canActivate(context)) as boolean;

    if (result) {
      const request = context.switchToHttp().getRequest();
      // The user object is attached by Passport's validate method
      const user = request.user;
      // Manually save the user to the session using iron-session
      request.session = user;
      await request.session.save();
    }

    return result;
  }
}
