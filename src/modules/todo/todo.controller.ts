import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { Auth } from '../auth';
import { PaginationDto, PaginationResponse } from '../common';
import { User, UserModel } from '../user';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { TodoModel as Todo } from './todo.interface';
import { TodoService } from './todo.service';

@Auth()
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @User() user: UserModel): Promise<Todo> {
    return this.todoService.create(createTodoDto, user);
  }

  @Get()
  findAll(@Query() pagination: PaginationDto, @User() user: UserModel): Promise<PaginationResponse<Todo>> {
    return this.todoService.findAll(pagination, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserModel): Promise<Todo> {
    return this.todoService.findOne(id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto, @User() user: UserModel): Promise<Todo> {
    return this.todoService.update(id, updateTodoDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserModel): Promise<{ message: string }> {
    return this.todoService.remove(id, user);
  }
}
