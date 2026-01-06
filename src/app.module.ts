import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthModule, HealthModule, SessionMiddleware, TodoModule, UserModule } from './modules';
import { PrismaModule } from './prisma';

@Module({
  imports: [PrismaModule, AuthModule, HealthModule, UserModule, TodoModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes({ path: '*path', method: RequestMethod.ALL });
  }
}
