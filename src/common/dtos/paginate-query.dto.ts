import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginateQuery as NestPaginateQuery } from 'nestjs-paginate';

export class PaginateQuery implements NestPaginateQuery {
	@ApiPropertyOptional()
	page?: number;

	@ApiPropertyOptional()
	limit?: number;

	@ApiPropertyOptional()
	sortBy?: [string, string][];

	@ApiPropertyOptional()
	searchBy?: string[];

	@ApiPropertyOptional()
	search?: string;

	@ApiPropertyOptional()
	filter?: {
		[column: string]: string | string[];
	};

	@ApiPropertyOptional()
	select?: string[];

	@ApiProperty()
	path: string;
}
