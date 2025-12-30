import { Module } from '@nestjs/common';
import { AuthModule, HealthModule, TodoModule, UserModule } from './modules';
import { PrismaModule } from './prisma';

@Module({
  imports: [PrismaModule, AuthModule, HealthModule, UserModule, TodoModule],
})
export class AppModule {}
