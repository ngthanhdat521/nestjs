import { GlobalHttpException } from '@common/exceptions/global-http.exception';
import {
	Injectable,
	ExceptionFilter,
	ArgumentsHost,
	HttpException,
	InternalServerErrorException
} from '@nestjs/common';
import { Catch } from '@nestjs/common'; // Import the Catch decorator
import { Response } from '@common/models/express.model';

@Catch() // Catch all exceptions by default
@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const context = host.switchToHttp();
		const response = context.getResponse<Response>();

		try {
			response.status(exception.getStatus()).json(new GlobalHttpException(exception));
		} catch {
			const error = new InternalServerErrorException('Internal Error Server', {
				cause: exception,
				description: 'Undefined Exception !'
			});

			response.status(error.getStatus()).json(new GlobalHttpException(error));
		}
	}
}
