import { IsObject, IsString } from "class-validator";
import { User } from "src/entities/user.entity";

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}