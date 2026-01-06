import { SetMetadata } from '@nestjs/common';

export const META_ROLES_KEY = 'roles';

export const Roles = (...roles: string[] /* Role[] */) => SetMetadata(META_ROLES_KEY, roles);
