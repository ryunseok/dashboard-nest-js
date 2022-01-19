import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/constants/jwtConstants';
import { User } from 'src/entities/user.entity';
import { AuthController } from '../controllers/auth.controller';
import { UsersModule } from './user.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s'},
    }),
    TypeOrmModule.forFeature([User])],

  controllers: [AuthController]
})
export class AuthModule {}
