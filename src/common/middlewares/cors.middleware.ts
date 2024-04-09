import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as expressCors from 'cors';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const cors = expressCors({
			origin: 'http://127.0.0.1:5500/'
		});

		cors(req, res, next);
	}
}
