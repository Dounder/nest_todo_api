import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Todo } from 'prisma/client';

import { PaginationDto, PaginationResponse } from '../common';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  findAll(@Query() pagination: PaginationDto): Promise<PaginationResponse<Todo>> {
    return this.todoService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.todoService.remove(id);
  }
}
