import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { CreateUserDto } from "src/dto/create-user.dto";
import { User } from "src/entities/user.entity";
import { UsersService } from "src/services/users.service";
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() userInfo: CreateUserDto) {
    return this.usersService.create(userInfo);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get("/:id")
  async findOneWithId(@Param('id') id: number) {
    return await this.usersService.findOneWithId(id);
  }

  @Get()
  async findOneWithEmail(@Query('user-email') userEmail) {
    return await this.usersService.findOneWithEmail(userEmail);
  }

  @Delete("/:id")
  async remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}