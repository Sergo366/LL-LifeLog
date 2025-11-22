import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleDto } from './dto/article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from '../shared/models/article.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../shared/models/user.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articlesRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateArticleDto) {
    const user = await this.userRepository
      .findOne({
        where: {
          id: 1,
        },
      })
      .catch((err) => {
        console.log(err);
        return err;
      });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const article = new ArticleEntity();
    article.title = data.title;
    article.text = data.text;
    article.description = data.description;
    article.tags = data.tags;
    article.author = user;

    const res = await this.articlesRepository.save(article);

    return new ArticleDto(res);
  }

  getList() {
    console.log('Getting list of articles');
  }

  getById(id: number) {
    console.log(`Getting article by id: ${id}`);
  }

  updateById(id: number) {
    console.log(`Update article by id: ${id}`);
  }

  deleteById(id: number) {
    console.log(`Delete article by id: ${id}`);
  }
}
