import { Injectable } from '@nestjs/common';
import { InsertResult } from 'typeorm';
import { ProductEntity } from '@modules/product/product.entity';
import { PaginateQuery, Paginated } from 'nestjs-paginate';
import { ProductDto } from './dtos/product.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
	constructor(private readonly productRepository: ProductRepository) {}

	/**
	 * Get list products with pagination query
	 * @param query
	 * @returns
	 */
	async getProducts(query: PaginateQuery): Promise<Paginated<ProductEntity>> {
		return this.productRepository.getProductsByPagination(query);
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
