import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as expressCsurf from 'csurf';

@Injectable()
export class CSURFMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const csurf = expressCsurf();

		csurf(req, res, next);
		console.log('token', req.body, req?.csrfToken());
	}
}
