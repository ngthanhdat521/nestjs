import {
	UseFilters,
	UseGuards,
	UseInterceptors,
	UsePipes,
	ValidationPipe,
	applyDecorators
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Controller as HttpController, Get as HttpGet, Post as HttpPost } from '@nestjs/common';
import { GlobalExceptionFilter } from '@common/filters/global-exception-filters.filter';
import { AuthenticationGuard } from '@common/guards/authentication.guard';
import { AuthorizationGuard } from '@common/guards/authorization.guard';
import { PaginateQuery } from '@common/dtos/paginate-query.dto';
import { CacheResponseInterceptor } from '@common/interceptors/cache.interceptor';

export const Get = (path?: string) => {
	return applyDecorators(
		HttpGet(path),
		// UseInterceptors(CacheResponseInterceptor),
		ApiBearerAuth()
		// ApiQuery({ type: PaginateQuery })
	);
};

export const Post = (path?: string) => {
	return applyDecorators(HttpPost(path), ApiBearerAuth());
};

export const Controller = (prefix: string) => {
	return applyDecorators(
		HttpController(prefix),
		ApiTags(prefix),
		// UseGuards(AuthenticationGuard, AuthorizationGuard),
		UseFilters(GlobalExceptionFilter),
		UsePipes(new ValidationPipe({ transform: true }))
	);
};
