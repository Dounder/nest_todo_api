import {
  type ArgumentsHost,
  BadRequestException,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

interface ValidationErrorResponse {
  message: string | string[];
  error: string;
  statusCode: number;
}

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(ExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Handle non-HTTP exceptions
    if (!(exception instanceof HttpException)) {
      this.logger.error(`Unhandled exception: ${exception}`, exception instanceof Error ? exception.stack : undefined);

      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        error: ['Internal Server Error'],
        timestamp: new Date().toISOString(),
      });
    }

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as ValidationErrorResponse | string;

    const message =
      typeof exceptionResponse === 'string' ? exceptionResponse : exceptionResponse.message || exception.message;

    const error = typeof exceptionResponse === 'string' ? exception.name : exceptionResponse.error || exception.name;

    // Special handling for validation errors
    const isValidationError = exception instanceof BadRequestException && Array.isArray(message);
    const finalMessage = isValidationError ? 'Validation error' : typeof message === 'string' ? message : 'Error';
    const finalErrors = isValidationError ? message : [error];

    this.logger.error(`HTTP Exception: (${status}) - ${JSON.stringify(message)}`);

    return response.status(status).json({
      statusCode: status,
      message: finalMessage,
      error: finalErrors,
      timestamp: new Date().toISOString(),
    });
  }
}
