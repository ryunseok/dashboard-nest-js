import { Controller, Delete, Post } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { UsersService } from "src/services/users.service";

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}


}