import {
	CallHandler,
	ExecutionContext,
	HttpStatus,
	Injectable,
	NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpResponse } from '@app/common/models/http-response.model';
import { Response, Request } from '@common/models/express.model';
import { CacheService } from '@modules/cache/cache.service';

@Injectable()
export class CacheResponseInterceptor implements NestInterceptor {
	constructor(private readonly cacheService: CacheService) {}

	async intercept(context: ExecutionContext, next: CallHandler) {
		const { method, originalUrl } = context.switchToHttp().getRequest<Request>();
		const response = context.switchToHttp().getResponse<Response>();
		const cachedData = await this.cacheService.getByUrl(method, originalUrl);

		// Check if this request is queried before, it's responsed from the cached data
		if (cachedData) {
			response
				.status(HttpStatus.OK)
				.json(new HttpResponse(HttpStatus.OK, cachedData, 'Cached data'));
			return Observable.create();
		}

		return next.handle();
	}
}
