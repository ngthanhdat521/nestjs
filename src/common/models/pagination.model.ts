import { PaginateConfig, PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { Repository } from './repository.model';
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { PaginationException } from '@app/common/exceptions/pagination.exception';
import { PaginationError } from '@common/enums/error.enum';

export class Pagination {
	public static async filter<Entity extends ObjectLiteral>(
		query: PaginateQuery,
		repository: Repository<Entity> | SelectQueryBuilder<Entity>,
		config: PaginateConfig<Entity>
	): Promise<Paginated<Entity>> {
		try {
			const paginatedData = await paginate(query, repository, config);
			return paginatedData;
		} catch (error) {
			throw new PaginationException({
				cause: error,
				description: PaginationError.PAGINATION_FAILURE
			});
		}
	}
}
