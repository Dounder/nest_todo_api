import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(3)
  @MaxLength(20)
  username: string;
}
