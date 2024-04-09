import { HttpExceptionOptions, InternalServerErrorException } from '@nestjs/common';
import { PaginationError } from '../enums/error.enum';

export class PaginationException extends InternalServerErrorException {
	constructor(descriptionOrOptions?: string | HttpExceptionOptions) {
		super(PaginationError.TITLE, descriptionOrOptions);
	}
}
