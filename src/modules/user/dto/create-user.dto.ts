import { Transform } from 'class-transformer';
import { IsEmail, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

import { normalizeString } from '../../common/utils/string.util';

export class CreateUserDto {
  @Transform(({ value }) => normalizeString(value))
  @IsEmail()
  email: string;

  @Transform(({ value }) => normalizeString(value, true))
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsStrongPassword()
  password: string;
}
