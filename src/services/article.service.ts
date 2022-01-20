import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateArticleDto } from "src/dto/create-article.dto";
import { UpdateArticleDto } from "src/dto/update-article.dto";
import { Article } from "src/entities/article.entity";
import { Repository } from "typeorm";

@Injectable()
export class AtricleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<any> {

    const article = new Article;

    article.content = createArticleDto.content;
    article.title = createArticleDto.title;

    await this.articleRepository.save(article);
  }

  findAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  findOne(id: number): Promise<Article> {
    return this.articleRepository.findOne({id: id});
  }

  async remove(id: number): Promise<void> {
    await this.articleRepository.delete(id);
  }

  async update(id: number, articleInfo: UpdateArticleDto): Promise<void> {
    await this.articleRepository.update(id, articleInfo);
  }

}