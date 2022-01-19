import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/constants';
import { User } from 'src/entities/user.entity';
import { JwtStrategy } from 'src/jwt.strategy';
import { LocalStrategy } from 'src/local.strategy';
import { AuthService } from 'src/services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { UsersModule } from './user.module';

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
