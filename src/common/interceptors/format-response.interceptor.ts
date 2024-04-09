import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';
import { HttpResponse } from '@app/common/models/http-response.model';
import { Response, Request } from '@common/models/express.model';
import { CacheService } from '@app/modules/cache';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
	constructor(private readonly cacheService: CacheService) {}

	intercept(context: ExecutionContext, next: CallHandler) {
		const response = context.switchToHttp().getResponse<Response>();
		const { method, originalUrl } = context.switchToHttp().getRequest<Request>();
		const status = response.statusCode;

		return next.handle().pipe(
			map(async (data) => {
				await this.cacheService.setByUrl(method, originalUrl, data, 10000000);
				return new HttpResponse(status, data);
			})
		);
	}
}
