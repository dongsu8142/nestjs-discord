import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { OAuth2Credentials } from './typeorm/entities/OAuth2Credentials';
import { Session } from './typeorm/entities/Session';
import { User } from './typeorm/entities/User';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    PassportModule.register({ session: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DB_HOST,
      port: Number(process.env.MYSQL_DB_PORT),
      username: process.env.MYSQL_DB_USERNAME,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_DATABASE,
      synchronize: true,
      entities: [User, Session, OAuth2Credentials],
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
