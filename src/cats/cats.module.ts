import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './cats.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Cat])],
  controllers: [
    CatsController
  ],
  providers: [
    CatsService
  ],
  exports: [
    CatsService
  ]
})

export class CatsModule {
  constructor(private readonly catsService: CatsService) {}
}