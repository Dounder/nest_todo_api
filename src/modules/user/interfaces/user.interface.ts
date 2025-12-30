import { User } from 'prisma/client';

export interface UserResponse extends Omit<User, 'password'> {}

export interface UserFindOneParams {
  withPassword: boolean;
}
