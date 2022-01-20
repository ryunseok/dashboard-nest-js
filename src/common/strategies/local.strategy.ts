import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from 'passport-local';
import { PassportStrategy } from "@nestjs/passport";
import { LoginUserDto } from "src/dto/login-user.dto";
import { AuthService } from "src/services/auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'userEmail'
    });
  }

  async validate(username: string, password: string): Promise<any> {
    let loginUserDto: LoginUserDto = {
      email: username,
      password: password,
    }
    const user = await this.authService.validateUser(loginUserDto);

    if(!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

