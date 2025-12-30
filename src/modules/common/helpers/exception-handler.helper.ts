import { HttpException, InternalServerErrorException, Logger } from '@nestjs/common';

interface HandleExceptionParams {
  error: unknown;
  context: string;
  message?: string;
}

export class ExceptionHandler {
  /**
   * Handles exceptions by logging them and re-throwing appropriately
   * @param params.error - The caught error
   * @param params.context - The context where the error occurred (e.g., 'UserService.create')
   * @param params.message - Optional custom message for internal server errors
   */
  static handle({ error, context, message }: HandleExceptionParams): never {
    const logger = new Logger(context);
    logger.error(`${message || 'No additional message provided.'}`);

    // If it's already an HttpException, re-throw it as-is
    if (error instanceof HttpException) throw error;

    // Log the unexpected error
    const errorStack = error instanceof Error ? error.stack : undefined;
    logger.error(`Unexpected error in ${context}`, errorStack);

    // Throw a generic internal server error
    throw new InternalServerErrorException({
      status: 500,
      message: message || 'An unexpected error occurred.',
    });
  }
}
