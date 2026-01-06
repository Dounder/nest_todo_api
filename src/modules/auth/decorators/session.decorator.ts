import { applyDecorators, UseGuards } from '@nestjs/common';
import { SessionGuard } from '../guards';

export function Session(/* ...roles: Role[] */) {
  return applyDecorators(UseGuards(SessionGuard));
}
