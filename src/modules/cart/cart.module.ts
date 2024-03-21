import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartRepository } from './cart.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCartService } from '../product-cart/product-cart.service';
import { ProductCartRepository } from '../product-cart/product-cart.repository';
import { UsersRepository } from '@user-module/user.repository';
import { UserService } from '@user-module/user.service';

@Module({
	imports: [TypeOrmModule.forFeature([CartRepository, ProductCartRepository, UsersRepository])],
	controllers: [CartController],
	providers: [
		CartService,
		ProductCartService,
		UserService,
		UsersRepository,
		ProductCartRepository,
		CartRepository
	]
})
export class CartModule {}
