import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleDto } from './dto/article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from '../shared/models/article.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../shared/models/user.entity';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articlesRepo: Repository<ArticleEntity>,
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

    const res = await this.articlesRepo.save(article);

    return new ArticleDto(res);
  }

  async getList() {
    const articles = await this.articlesRepo.find();
    return articles.map((article) => new ArticleDto(article));
  }

  async getById(id: number) {
    const article = await this.articlesRepo
      .findOne({
        where: { id },
      })
      .catch((err) => {
        console.log(err);
        return err;
      });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return new ArticleDto(article);
  }

  async updateById(id: number, article: UpdateArticleDto) {
    await this.articlesRepo
      .update(
        { id },
        {
          title: article.title,
          text: article.text,
          description: article.description,
          tags: article.tags,
        },
      )
      .catch((err) => {
        console.log(err);
        return err;
      });

    return this.getById(id);
  }

  async deleteById(id: number) {
    await this.articlesRepo.delete(id).catch((err) => {
      console.log(err);
      return err;
    });
  }
}
