import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Repository } from '@models/repository.model';
import { ProductEntity } from './product.entity';
import { Pagination } from '@app/common/models/pagination.model';
import { PaginateQuery } from '@app/common/dtos/paginate-query.dto';
import { FilterOperator, FilterSuffix } from 'nestjs-paginate';

@Injectable()
export class ProductRepository extends Repository<ProductEntity> {
	constructor(private dataSource: DataSource) {
		super(ProductEntity, dataSource.createEntityManager());
	}

	async getProductsByPagination(query: PaginateQuery) {
		return Pagination.filter(query, this, {
			sortableColumns: ['id'],
			nullSort: 'last',
			defaultSortBy: [['id', 'DESC']],
			searchableColumns: ['id', 'title', 'description', 'price'],
			select: ['id', 'title', 'description', 'price'],
			filterableColumns: {
				name: [FilterOperator.EQ, FilterSuffix.NOT],
				age: true
			}
		});
	}
}
