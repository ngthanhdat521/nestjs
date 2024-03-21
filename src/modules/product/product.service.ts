import { Injectable } from '@nestjs/common';
import { InsertResult } from 'typeorm';
import { ProductEntity } from '@product-module/product.entity';
import { FilterOperator, FilterSuffix, PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { ProductDto } from './dtos/product.dto';
import { ProductRepository } from './product.repository';
import { CacheService } from '../cache';

@Injectable()
export class ProductService {
	constructor(
		private readonly productRepository: ProductRepository,
		private readonly cacheService: CacheService
	) {}

	/**
	 * Get list products with pagination query
	 * @param query
	 * @returns
	 */
	async get(query: PaginateQuery): Promise<Paginated<ProductEntity>> {
		const cacheData = await this.cacheService.get('data_products');
		console.log('cacheData', cacheData);

		if (cacheData) return JSON.parse(cacheData) as Paginated<ProductEntity>;

		console.log('data is not cached');

		const data = paginate(query, this.productRepository, {
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

		await this.cacheService.set('data_products', JSON.stringify(data), 1000);

		return data;
	}

	/**
	 * Insert a list of products
	 * @param query
	 * @returns
	 */
	async insertNewProducts(products: ProductDto[]): Promise<InsertResult> {
		return this.productRepository.insertMany(products as ProductEntity[]);
	}
}
