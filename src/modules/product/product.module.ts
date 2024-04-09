import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { CacheService } from '@modules/cache/cache.service';

@Module({
	imports: [TypeOrmModule.forFeature([ProductRepository])],
	exports: [ProductService],
	controllers: [ProductController],
	providers: [ProductService, ProductRepository, CacheService]
})
export class ProductModule {}
