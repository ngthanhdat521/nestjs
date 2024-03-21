import { Module } from '@nestjs/common';
import { ProductCartService } from './product-cart.service';
import { ProductCartController } from './product-cart.controller';
import { ProductCartRepository } from './product-cart.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([ProductCartRepository])],
	exports: [],
	providers: [ProductCartService, ProductCartRepository],
	controllers: [ProductCartController]
})
export class ProductCartModule {}
