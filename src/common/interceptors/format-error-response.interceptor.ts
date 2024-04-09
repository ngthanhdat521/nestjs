import {
	CallHandler,
	ExecutionContext,
	HttpException,
	Injectable,
	NestInterceptor
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class FormatErrorResponseInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			catchError((error) => {
				const response = context.switchToHttp().getResponse();
				const status = error.status || 500;

				// Format lỗi theo định dạng mong muốn
				const errorResponse = {
					statusCode: 'status',
					message: 'error.message',
					errors: error.errors
				};

				response.status(status).json(errorResponse);

				return throwError(() => new HttpException(response, status, { cause: error }));
			})
		);
	}
}
