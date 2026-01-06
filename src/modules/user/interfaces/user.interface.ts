import { Prisma, User } from 'prisma/client';

export interface UserResponse extends Omit<User, 'password'> {}

export interface UserFindOneParams {
  where: Prisma.UserWhereUniqueInput;
  withPassword?: boolean;
}
