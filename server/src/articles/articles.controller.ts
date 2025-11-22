import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly service: ArticlesService) {}

  @Post()
  create(@Body() data: CreateArticleDto) {
    return this.service.create(data);
  }

  @Get()
  getList() {
    return this.service.getList();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.service.getById(id);
  }

  @Put(':id')
  updateById(@Param('id') id: number) {
    return this.service.updateById(id);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.service.deleteById(id);
  }
}
