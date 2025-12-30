import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Todo } from 'prisma/client';
import { PrismaService } from 'src/prisma';

import { ExceptionHandler, PaginationDto, PaginationResponse } from '../common';
import { CreateTodoDto, UpdateTodoDto } from './dto';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    try {
      const todo = await this.prisma.todo.create({ data: createTodoDto });
      return todo;
    } catch (error) {
      ExceptionHandler.handle({
        error,
        context: 'TodoService.create',
        message: 'An error occurred while creating the todo.',
      });
    }
  }

  async findAll(pagination: PaginationDto): Promise<PaginationResponse<Todo>> {
    try {
      const { page, limit } = pagination;

      const [data, total] = await this.prisma.$transaction([
        this.prisma.todo.findMany({
          take: limit,
          skip: (page - 1) * limit,
        }),
        this.prisma.todo.count(),
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

  async findOne(id: string): Promise<Todo> {
    try {
      const todo = await this.prisma.todo.findUnique({ where: { id } });

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

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    try {
      const todo = await this.findOne(id);

      const updatedTodo = await this.prisma.todo.update({
        where: { id: todo.id },
        data: updateTodoDto,
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

  async remove(id: string): Promise<{ message: string }> {
    try {
      const todo = await this.findOne(id);
      await this.prisma.todo.delete({ where: { id: todo.id } });
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
