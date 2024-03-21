import { GlobalHttpException } from '@exceptions/global-http-exception.exception';
import {
	Injectable,
	ExceptionFilter,
	ArgumentsHost,
	HttpException,
	InternalServerErrorException
} from '@nestjs/common';
import { Catch } from '@nestjs/common'; // Import the Catch decorator
import { Response } from 'express';

@Catch() // Catch all exceptions by default
@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const context = host.switchToHttp();
		const response = context.getResponse<Response>();

		try {
			response.status(exception.getStatus()).json(new GlobalHttpException(exception));
		} catch {
			console.log('Undefined Exception', exception);
			const error = new InternalServerErrorException('Internal Error Server', {
				cause: exception,
				description: 'Undefined Exception !'
			});

			response.status(error.getStatus()).json(new GlobalHttpException(error));
		}
	}
}
