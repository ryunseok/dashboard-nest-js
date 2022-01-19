import { ForbiddenException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/dto/create-user.dto";
import { User } from "src/entities/user.entity";
import { Connection, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { bcryptConstant } from "src/constants";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const isExist = await this.usersRepository.findOne({email: createUserDto.email});
    if (isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: ['이 Email로 가입된 사용자가 이미 있습니다.'],
        error: 'AlreadyUserExists'
      })
    }
    let user = new User;
    const passwordSalt = await bcrypt.genSalt(bcryptConstant.saltOrRounds);

    user.email = createUserDto.email;
    user.role = createUserDto.role || "user";
    user.userName = createUserDto.userName;
    user.passwordHash = await bcrypt.hash(createUserDto.password, passwordSalt);

    await this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    const results= this.usersRepository.find({
      select: ["id", "email", "userName", "role"],
    });

    return results
  }

  findOneWithEmail(userEmail: string): Promise<User> {
    return this.usersRepository.findOne({email: userEmail}, {
      select: ["id", "email", "userName", "role"],
    });
  }

  findOneWithId(id: number): Promise<User> {
    return this.usersRepository.findOne({id: id}, {
      select: ["id", "email", "userName", "role"],
    });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}