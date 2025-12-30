import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { CustomException } from 'src/exceptions';
import { TestErrorDto } from './dto';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  checkHealth() {
    return this.healthService.checkHealth();
  }

  @Get('error')
  throwError() {
    throw new CustomException({
      message: 'This is a custom error message',
      status: HttpStatus.I_AM_A_TEAPOT,
    });
  }

  @Post('error/validation')
  throwValidationError(@Body() body: TestErrorDto) {
    return body;
  }

  @Get('db')
  checkDatabaseConnection() {
    return this.healthService.checkDatabaseConnection();
  }
}
