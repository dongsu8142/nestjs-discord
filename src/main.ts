import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { getRepository } from 'typeorm';
import { Session } from './typeorm/entities/Session';
import { TypeormStore } from 'connect-typeorm/out';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5000;
  const sessionRepository = getRepository(Session);
  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000 * 24,
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:8000'],
  });
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(PORT);
  console.log(`Running on port ${PORT}`);
}
bootstrap();
