import { Prisma, User } from 'prisma/client';

export interface UserModel extends Omit<User, 'password'> {}

export interface UserFindOneParams {
  where: Prisma.UserWhereUniqueInput;
  withPassword?: boolean;
}
