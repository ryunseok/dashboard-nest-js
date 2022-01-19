import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { Connection, getConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';
import { Auth } from './auth';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    UsersModule,
    LoggerModule.forRoot(),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, Auth],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
