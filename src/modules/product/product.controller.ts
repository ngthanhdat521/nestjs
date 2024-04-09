import { Body } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ProductService } from '@modules/product/product.service';
import { ProductEntity } from '@modules/product/product.entity';
import { Paginate, Paginated } from 'nestjs-paginate';
import { PaginateQuery } from '@common/dtos/paginate-query.dto';
import { InsertResult } from 'typeorm';
import { ProductsDto } from './dtos/products.dto';
import { Roles } from '@common/decorators/roles.decorator';
import { Controller, Get, Post } from '@common/decorators/http.decorator';

@Controller('product')
export class ProductController {
	constructor(private productService: ProductService) {}

	@Get()
	@ApiOkResponse({
		type: ProductEntity
	})
	@ApiOperation({ summary: 'Get list of products' })
	@Roles(['admin', 'user'])
	get(@Paginate() query: PaginateQuery): Promise<Paginated<ProductEntity>> {
		return this.productService.getProducts(query);
	}

	@Post()
	@ApiOperation({ summary: 'Create list of products' })
	@ApiBody({
		type: ProductsDto,
		required: true
	})
	@ApiOkResponse({
		type: InsertResult
	})
	@Roles(['admin'])
	insertNewProducts(@Body() data: ProductsDto) {
		return this.productService.insertNewProducts(data.products);
	}
}
