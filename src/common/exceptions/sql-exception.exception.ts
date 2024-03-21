import {
  HttpExceptionOptions,
  InternalServerErrorException,
} from '@nestjs/common';

export class SQLException extends InternalServerErrorException {
  constructor(descriptionOrOptions?: string | HttpExceptionOptions) {
    super('PostgreSQL Query Error', descriptionOrOptions);
  }
}
