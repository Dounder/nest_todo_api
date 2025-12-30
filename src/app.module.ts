import { Module } from '@nestjs/common';
import { HealthModule, TodoModule, UserModule } from './modules';

@Module({
  imports: [HealthModule, UserModule, TodoModule],
})
export class AppModule {}
