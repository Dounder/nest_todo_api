import { Prisma } from 'prisma/client';

export const TODO_FIELDS_TO_OMIT: Prisma.TodoOmit = {
  userId: true,
};
