import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { MetadataKey } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import { CacheService } from '../cache';

@Module({
	imports: [TypeOrmModule.forFeature([ProductRepository])],
	exports: [ProductService],
	controllers: [ProductController],
	providers: [
		ProductService,
		ProductRepository,
		CacheService,
		{
			provide: MetadataKey.REDIS,
			useFactory(config: ConfigService) {
				return new Redis({
					port: config.get('REDIS_PORT'),
					host: config.get('REDIS_HOST'),
					db: config.get('REDIS_DB'),
					password: config.get('REDIS_PASSWORD'),
					keyPrefix: config.get('REDIS_PREFIX')
				});
			},
			inject: [ConfigService]
		}
	]
})
export class ProductModule {}
