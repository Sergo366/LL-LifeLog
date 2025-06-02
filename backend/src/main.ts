import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import IORedis from 'ioredis';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = app.get(ConfigService);
	const redis = new IORedis(config.getOrThrow<string>('REDIS_URI'));

	app.use(cookieParser(config.getOrThrow<string>('COOKIE_SECRET')));
	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	app.use(
		session({
			secret: config.getOrThrow<string>('SESSION_SECRET'),
			name: config.getOrThrow<string>('SESSION_NAME'),
			resave: true,
			saveUninitialized: false,
			cookie: {
				domain: config.getOrThrow<string>('SESSION_DOMAIN'),
				maxAge: config.getOrThrow<number>('SESSION_MAX_AGE'),
				httpOnly: true,
				sameSite: 'lax',
				secure: config.getOrThrow<boolean>('IS_PRODUCTION')
			}
		})
	);
	app.enableCors({
		origin: config.getOrThrow<string>('ALLOWED_ORIGINS'),
		credentials: true,
		exposedHeaders: ['set-cookie']
	});

	await app.listen(config.getOrThrow<number>('APPLICATION_PORT'));
}
bootstrap();
