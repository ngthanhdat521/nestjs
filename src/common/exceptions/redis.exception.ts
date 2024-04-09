import { HttpExceptionOptions, InternalServerErrorException } from '@nestjs/common';

export class RedisException extends InternalServerErrorException {
	constructor(descriptionOrOptions?: string | HttpExceptionOptions) {
		super('Redis Error', descriptionOrOptions);
	}
}
