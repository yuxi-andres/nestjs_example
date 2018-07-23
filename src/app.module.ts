import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm'

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LoggerMiddleware } from './common/middlewares/logger.middleware';

import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CatsModule
  ],
  exports: [],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})

export class AppModule implements NestModule {
  constructor(private readonly connection: Connection){}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'cats', method: RequestMethod.POST },
      )
      // .forRoutes('cats');
      // .forRoutes(CatsController);
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}