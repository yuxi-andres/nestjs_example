import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cats.entity';


@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
  ) {}

  async create(cat: Cat) {
    await this.catRepository.save(cat);
    // this.catRepository.create(cat);
  }

  async findAll(): Promise<Cat[]> {
    return await this.catRepository.find();
  }

  async findOne(id): Promise<Cat> {
    return await this.catRepository.findOneOrFail(id);
  }
}
