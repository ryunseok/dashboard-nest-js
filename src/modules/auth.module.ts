import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/common/constants';
import { User } from 'src/entities/user.entity';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { AuthService } from 'src/services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { UsersModule } from './user.module';
import { LocalStrategy } from 'src/common/strategies/local.strategy';


@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
