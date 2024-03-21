import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { Request } from '@models/request.model';
import { CartEntity } from './cart.entity';
import { WaitingOrderDto } from './dtos/waiting-order.dto';
import { ProductCartService } from '../product-cart/product-cart.service';
import { UserEntity } from '@user-module/user.entity';

@Injectable()
export class CartService {
	constructor(
		private readonly cartRepository: CartRepository,
		private readonly productCartService: ProductCartService
	) {}

	public async insertCartForNewUser(request: Request, orders: WaitingOrderDto[]) {
		const userId = request.session.user.id;

		let myCart = await this.cartRepository.selectOne({
			where: {
				user: {
					id: userId
				}
			}
		});

		// Create a new cart if user dont have
		if (!myCart) {
			const newCart = new CartEntity();
			const newUser = new UserEntity();
			newUser.id = userId;
			newCart.user = newUser;
			myCart = await this.cartRepository.saveOne(newCart);
		}

		return this.productCartService.insertManyProductCarts(myCart.id, orders);
	}

	public getMyCart(request: Request) {
		const { id } = request.session.user;

		return this.cartRepository.getByUserId(id);
	}
}
