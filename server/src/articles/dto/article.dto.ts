import { ArticleEntity } from '../../shared/models/article.entity';

export class ArticleDto {
  id: number;
  title: string;
  text: string;
  description: string;
  tags: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(article: ArticleEntity) {
    this.id = article.id;
    this.title = article.title;
    this.text = article.text;
    this.description = article.description;
    this.tags = article.tags;
    this.createdAt = article.createdAt;
    this.updatedAt = article.updatedAt;
  }
}
