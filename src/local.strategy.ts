import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthService } from "./services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      emailField: 'email'
    });
  }

  async validate(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.authService.validateUser(loginUserDto);

    if(!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

