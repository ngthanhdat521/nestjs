import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import expressHelmet from 'helmet';

@Injectable()
export class HelmetMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const helmet = expressHelmet();

		helmet(req, res, next);
	}
}
