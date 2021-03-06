import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateArticleDto } from "src/dto/create-article.dto";
import { UpdateArticleDto } from "src/dto/update-article.dto";
import { AtricleService } from "src/services/article.service";

@Controller('board')
export class BoardController {
  constructor(private articleService: AtricleService) {}

  @Post()
  create(@Body() articleInfo: CreateArticleDto) {
    return this.articleService.create(articleInfo);
  }

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return this.articleService.findOne(id);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number) {
    return this.articleService.remove(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() articleInfo: UpdateArticleDto) {
    return this.articleService.update(id, articleInfo);
  }
}