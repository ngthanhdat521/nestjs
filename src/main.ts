import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useSwagger } from './app.swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cors from 'cors';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { createClient } from 'redis';
import Redis from 'ioredis';
import * as createRedisStore from 'connect-redis';

async function bootstrap() {
	const logger = new Logger('Bootstrap');
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		logger: ['error', 'debug', 'verbose']
	});
	const configService = app.get<ConfigService>(ConfigService);
	const port = configService.get<string>('PORT') || 5000;
	const nodeEnv = configService.get<string>('NODE_ENV');

	app.enableCors({
		origin: true,
		credentials: true
	});
	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: '1'
	});

	const redisClient = new Redis({
		host: 'localhost',
		port: 6379,
		db: 1,
		password: 'redis',
		keyPrefix: 'nestjs_boilerplate'
	});
	const RedisStore = createRedisStore(session);

	app.use(
		cors({
			origin: 'http://127.0.0.1:5500',
			credentials: true
		})
	);
	// app.use(cookieParser());
	app.use(
		session({
			secret: 'your-secret',
			resave: true,
			rolling: false,
			saveUninitialized: false,
			unset: 'destroy',
			store: new RedisStore({ client: redisClient })
			// store: new RedisStore({ client: redisClient })
			// cookie: {
			// 	sameSite: 'none',
			// 	secure: true,
			// 	httpOnly: true,
			// 	maxAge: 8600000
			// }
		})
	);
	app.setBaseViewsDir(join(__dirname, 'views'));
	app.setViewEngine('hbs');
	useSwagger(app);

	await app.listen(port).then(async () => {
		const url = await app.getUrl();
		logger.debug(`Your app is running on port ${port}`);
		logger.debug(`Environment: ${nodeEnv}`);
		logger.debug(`Documentation ${url}/docs`);
	});
}
bootstrap();
