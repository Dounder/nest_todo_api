import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  // constructor() {}

  getStatus(): string {
    this.logger.log('AuthService getStatus called');
    return 'Authentication service is running';
  }
}
1;
