import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "src/dto/create-user.dto";
import { User } from "src/entities/user.entity";
import { UsersService } from "src/services/users.service";
import * as bcrypt from 'bcrypt';
import { Role } from "src/common/decorators/role.decorator";
import { RolesGuard } from "src/common/guards/roles.guard";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() userInfo: CreateUserDto) {
    return this.usersService.create(userInfo);
  }

  @Get()
  @Role('admin')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get("/:id")
  @Role('admin')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async findOneWithId(@Param('id') id: number) {
    return await this.usersService.findOneWithId(id);
  }

  @Get()
  @Role('admin')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async findOneWithEmail(@Query('user-email') userEmail: string) {
    return await this.usersService.findOneWithEmail(userEmail);
  }

  @Delete("/:id")
  @Role('admin')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}