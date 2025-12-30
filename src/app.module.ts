import { Module } from '@nestjs/common';
import { HealthModule, UserModule } from './modules';

@Module({
  imports: [HealthModule, UserModule],
})
export class AppModule {}
