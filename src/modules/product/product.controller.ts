import { GlobalExceptionFilter } from '@filters/global-exception-filters.filter';
import {
	Body,
	Controller,
	Get,
	Post,
	UseFilters,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiBody,
	ApiOkResponse,
	ApiOperation,
	ApiQuery,
	ApiTags
} from '@nestjs/swagger';
import { ProductService } from '@product-module/product.service';
import { ProductEntity } from '@product-module/product.entity';
import { AuthGuard } from '@guards/auth-guard.guard';
import { Paginate, Paginated } from 'nestjs-paginate';
import { PaginateQuery } from '@common-dtos/paginate-query.dto';
import { InsertResult } from 'typeorm';
import { ProductsDto } from './dtos/products.dto';
import { Roles } from '@decorators/roles.decorater';

@Controller('product')
@ApiTags('product')
@UseGuards(AuthGuard)
@UseFilters(GlobalExceptionFilter)
@UsePipes(new ValidationPipe({ transform: true }))
export class ProductController {
	constructor(private productService: ProductService) {}

	@Get()
	@ApiOkResponse({
		type: ProductEntity
	})
	@ApiQuery({ type: PaginateQuery })
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Get list of products' })
	@Roles(['admin', 'user'])
	get(@Paginate() query: PaginateQuery): Promise<Paginated<ProductEntity>> {
		return this.productService.get(query);
	}

	@Post()
	@ApiBearerAuth()
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
