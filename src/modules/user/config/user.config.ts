import { Prisma } from 'prisma/client';

export const USER_FIELDS_TO_OMIT: Prisma.UserOmit = {
  password: true,
};
