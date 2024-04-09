import { Module } from '@nestjs/common';
import { CartService } from '@modules/cart/cart.service';
import { CartController } from '@modules/cart/cart.controller';
import { CartRepository } from '@modules/cart/cart.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCartService } from '@modules/product-cart/product-cart.service';
import { ProductCartRepository } from '@modules/product-cart/product-cart.repository';
import { UsersRepository } from '@modules/user/user.repository';
import { UserService } from '@modules/user/user.service';
import { CacheService } from '@modules/cache/cache.service';

@Module({
	imports: [TypeOrmModule.forFeature([CartRepository, ProductCartRepository, UsersRepository])],
	controllers: [CartController],
	providers: [
		CartService,
		ProductCartService,
		UserService,
		UsersRepository,
		ProductCartRepository,
		CartRepository,
		CacheService
	]
})
export class CartModule {}
