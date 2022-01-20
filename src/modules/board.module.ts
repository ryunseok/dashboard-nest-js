import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardController } from "src/controllers/board.controller";
import { Article } from "src/entities/article.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [BoardController],
})

export class BoardModule {}