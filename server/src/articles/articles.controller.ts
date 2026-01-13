import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { EUserRole } from '../shared/models/user.entity';
import { Roles } from '../shared/decorators/roles.decorator';
import { RolesGuard } from '../shared/guards/roles.guard';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly service: ArticlesService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(EUserRole.ADMIN)
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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(EUserRole.ADMIN)
  updateById(@Param('id') id: number, @Body() data: UpdateArticleDto) {
    return this.service.updateById(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(EUserRole.ADMIN)
  deleteById(@Param('id') id: number) {
    return this.service.deleteById(id);
  }
}
