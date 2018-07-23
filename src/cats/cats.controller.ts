import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Header,
  Req,
  Res,
  Body,
  Query,
  Param,
  HttpException,
  UseFilters,
  UsePipes
} from '@nestjs/common';

import { ForbiddenException } from 'common/exceptions/forbidden.exception';
import { HttpExceptionFilter } from 'common/filters/http-exception.filter';
import { JoiValidationPipe } from 'common/pipes/joi-validation.pipe';
import { ValidationPipe } from 'common/pipes/validation.pipe';
import { ParseIntPipe } from 'common/pipes/parse-int.pipe';

import { Cat } from './cats.entity';
import { CatsService } from './cats.service';

@Controller('cats')
// @UseFilters(new HttpExceptionFilter())
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // @Post()
  // @HttpCode(204)
  // @Header('Cache-Control', 'none')
  // create() {
  //   return 'This action adds a new cat';
  // }

  // @Post()
  // create(@Body() createCatDto) {
  //   return 'This action adds a new cat';
  // }

  // @Post()
  // create(@Res() res) {
  //   res.status(HttpStatus.CREATED).send();
  // }

  // @Post()
  // async create(@Body() createCatDto: CreateCatDto) {
  //   this.catsService.create(createCatDto);
  // }

  @Post()
  async create(@Body() cat: Cat) {
    return await this.catsService.create(cat);
  }

  @Post('create2')
  async createWithException(@Body() cat: Cat) {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'This is a custom message',
    }, 403);
  }

  @Post('create3')
  async createWithCustomException(@Body() cat: Cat) {
    throw new ForbiddenException();
  }

  @Post('create4')
  @UseFilters(new HttpExceptionFilter())
  async createWithFilter(@Body() cat: Cat) {
    throw new ForbiddenException();
  }

  // @Post('create5')
  // @UsePipes(new JoiValidationPipe(createCatSchema))
  // async createWithPipe(@Body() createCatDto: CreateCatDto) {
  //   this.catsService.create(createCatDto);
  // }

  @Post('create6')
  async createWithValidation(@Body(new ValidationPipe()) cat: Cat) {
    this.catsService.create(cat);
  }

  @Post('create7')
  @UsePipes(new ValidationPipe())
  async createWithValidationPipeInstance(@Body() cat: Cat) {
    this.catsService.create(cat);
  }

  @Post('create8')
  @UsePipes(ValidationPipe)
  async createWithValidationPipe(@Body() cat: Cat) {
    this.catsService.create(cat);
  }

  // @Get()
  // findAll() {
  //   return 'This action returns all cats';
  // }

  // @Get()
  // findAll(@Query() query) {
  //   return `This action returns all cats (limit: ${query.limit} items)`;
  // }

  // @Get()
  // findAll(@Req() request) {
  //   return 'This action returns all cats';
  // }

  // @Get()
  // findAll(@Res() res) {
  //   res.status(HttpStatus.OK).json([]);
  // }

  // @Get()
  // async findAll(): Promise<any[]> {
  //   return [];
  // }

  // @Get()
  // findAll(): Observable<any[]> {
  //   return of([]);
  // }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id) {
  //   return `This action returns a #${id} cat`;
  // }

  @Get(':id')
  findOne(@Param() params) {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  @Get('/findOne/:id')
  async findOneWithPipe(@Param('id', new ParseIntPipe()) id) {
    return await this.catsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id, @Body() updateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return `This action removes a #${id} cat`;
  }
}