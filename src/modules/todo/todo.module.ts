import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [PrismaModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
