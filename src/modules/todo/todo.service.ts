import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma';

import { ExceptionHandler, PaginationDto, PaginationResponse } from '../common';
import { UserModel } from '../user';
import { TODO_FIELDS_TO_OMIT } from './config';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { TodoModel } from './todo.interface';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto, user: UserModel): Promise<TodoModel> {
    try {
      const todo = await this.prisma.todo.create({
        data: { ...createTodoDto, userId: user.id },
        omit: TODO_FIELDS_TO_OMIT,
      });
      return todo;
    } catch (error) {
      ExceptionHandler.handle({
        error,
        context: 'TodoService.create',
        message: 'An error occurred while creating the todo.',
      });
    }
  }

  async findAll(pagination: PaginationDto, user: UserModel): Promise<PaginationResponse<TodoModel>> {
    try {
      const { page, limit } = pagination;

      const [data, total] = await this.prisma.$transaction([
        this.prisma.todo.findMany({
          take: limit,
          skip: (page - 1) * limit,
          where: { userId: user.id },
          orderBy: { createdAt: 'desc' },
          omit: TODO_FIELDS_TO_OMIT,
        }),
        this.prisma.todo.count({ where: { userId: user.id } }),
      ]);

      const lastPage = Math.ceil(total / limit);

      return { meta: { total, page, lastPage }, data };
    } catch (error) {
      ExceptionHandler.handle({
        error,
        context: 'TodoService.findAll',
        message: 'An error occurred while fetching todos.',
      });
    }
  }

  async findOne(id: string, user: UserModel): Promise<TodoModel> {
    try {
      const todo = await this.prisma.todo.findUnique({ where: { id, userId: user.id }, omit: TODO_FIELDS_TO_OMIT });

      if (!todo)
        throw new NotFoundException({
          status: 404,
          message: `Todo with id ${id} not found.`,
        });

      return todo;
    } catch (error) {
      ExceptionHandler.handle({
        error,
        context: `TodoService.findOne(${id})`,
        message: 'An error occurred while fetching the todo.',
      });
    }
  }

  async update(id: string, updateTodoDto: UpdateTodoDto, user: UserModel): Promise<TodoModel> {
    try {
      const todo = await this.findOne(id, user);

      const updatedTodo = await this.prisma.todo.update({
        where: { id: todo.id, userId: user.id },
        data: updateTodoDto,
        omit: TODO_FIELDS_TO_OMIT,
      });

      return updatedTodo;
    } catch (error) {
      ExceptionHandler.handle({
        error,
        context: `TodoService.update(${id})`,
        message: 'An error occurred while updating the todo.',
      });
    }
  }

  async remove(id: string, user: UserModel): Promise<{ message: string }> {
    try {
      const todo = await this.findOne(id, user);
      await this.prisma.todo.delete({ where: { id: todo.id, userId: user.id } });
      return { message: `Todo with id ${id} has been removed.` };
    } catch (error) {
      ExceptionHandler.handle({
        error,
        context: `TodoService.remove(${id})`,
        message: 'An error occurred while removing the todo.',
      });
    }
  }
}
