import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardController } from "src/controllers/board.controller";
import { Article } from "src/entities/article.entity";
import { AtricleService } from "src/services/article.service";

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  exports: [AtricleService],
  providers: [AtricleService],
  controllers: [BoardController],
})

export class ArticleModule {}