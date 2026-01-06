import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards';

export function Auth(/* ...roles: Role[] */) {
  return applyDecorators(UseGuards(AuthGuard));
}
