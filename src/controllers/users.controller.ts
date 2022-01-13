import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "src/dto/create-user.dto";
import { User } from "src/entities/user.entity";
import { UsersService } from "src/services/users.service";
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get("/:id")
  async findOne(@Param('id') id: number) {
    return await this.usersService.findOne(id);
  }

  @Delete("/:id")
  async remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}