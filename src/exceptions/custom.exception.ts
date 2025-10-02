import { HttpException } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(options: { message: string; status: number }) {
    super(options.message, options.status);
  }
}
