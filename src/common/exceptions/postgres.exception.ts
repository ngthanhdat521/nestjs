import { HttpExceptionOptions, InternalServerErrorException } from '@nestjs/common';
import { PostgresError } from '@common/enums/error.enum';

export class PostgresException extends InternalServerErrorException {
	constructor(descriptionOrOptions?: string | HttpExceptionOptions) {
		super(PostgresError.TITLE, descriptionOrOptions);
	}
}
