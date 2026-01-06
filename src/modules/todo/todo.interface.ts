import { Todo } from 'prisma/client';

export interface TodoModel extends Omit<Todo, 'userId'> {}
