import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CacheService } from '@app/modules/cache';
import { HttpResponse } from '../models/http-response.model';

@Injectable()
export class CacheMiddleware implements NestMiddleware {
	constructor(private readonly cacheService: CacheService) {}

	async use(request: Request, response: Response, next: NextFunction) {
		console.log('vao1');
		const { method, originalUrl } = request;
		const status = 200;
		const cachedData = await this.cacheService.getByUrl(method, originalUrl);

		// Check if this request is queried before, it's responsed from the cached data
		if (cachedData) {
			return response
				.status(status)
				.json(new HttpResponse(status, cachedData, 'Cached data'));
		}

		return next();
	}
}
