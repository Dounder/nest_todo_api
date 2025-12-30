import { IsString, MinLength } from 'class-validator';
import { IsCuid } from 'src/modules/common';

export class CreateTodoDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsCuid()
  userId: string;
}
