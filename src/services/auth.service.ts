import { ForbiddenException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginUserDto } from "src/dto/login-user.dto";
import { User } from "src/entities/user.entity";
import * as bcrypt from 'bcrypt';
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async validateUser(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.usersRepository.findOne({email: loginUserDto.email});

    if(!user) {
      throw new ForbiddenException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['등록되지 않은 사용자입니다.'],
        error: 'NotFound'
      })
    }

    const isMatch = await bcrypt.compare(loginUserDto.password, user.passwordHash)

    if(isMatch) {
      const { passwordHash, ...result } = user;
      return result;
    } else {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: ['비밀번호 확인 후 다시 시도하여 주시기 바랍니다.'],
        error: 'Forbidden'
      })
    }
  }

  async login(user: any) {
    const payload = { id: user.id, email: user.email, userName: user.userName, role: user.role, active: user.isActive };
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}