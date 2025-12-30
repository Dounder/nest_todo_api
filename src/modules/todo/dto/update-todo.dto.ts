import { IsString, MinLength } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @MinLength(3)
  title: string;
}
