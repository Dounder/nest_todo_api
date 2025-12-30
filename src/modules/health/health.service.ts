import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(private readonly prisma: PrismaService) {}

  checkHealth() {
    this.logger.debug('Checking health...');
    return { status: 'healthy' };
  }

  async checkDatabaseConnection() {
    this.logger.debug('Checking database connection...');
    await this.prisma.$queryRaw`SELECT 1`;
    return { database: 'connected' };
  }
}
