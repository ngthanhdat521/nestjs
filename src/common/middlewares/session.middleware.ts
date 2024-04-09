import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as expressSession from 'express-session';
import { createClient } from 'redis';
import * as createRedisStore from 'connect-redis';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const RedisStore = createRedisStore(expressSession);

		const redisClient = createClient({
			host: 'localhost',
			port: '6379'
		});

		const session = expressSession({
			store: new RedisStore({ client: redisClient as any }),
			secret: 'this is a secret msg',
			resave: true,
			saveUninitialized: true,
			cookie: {
				sameSite: 'none'
			}
		});

		session(req, res, next);
	}
}
