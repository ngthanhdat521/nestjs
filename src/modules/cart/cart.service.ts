import { Injectable } from '@nestjs/common';
import { Request } from '@common/models/express.model';
import { CartEntity } from '@modules/cart/cart.entity';
import { WaitingOrderDto } from '@modules/cart/dtos/waiting-order.dto';
import { ProductCartService } from '@modules/product-cart/product-cart.service';
import { UserEntity } from '@modules/user/user.entity';
import { CartRepository } from '@modules/cart/cart.repository';

@Injectable()
export class CartService {
	constructor(
		private readonly cartRepository: CartRepository,
		private readonly productCartService: ProductCartService
	) {}

	public async insertCartForNewUser(request: Request, orders: WaitingOrderDto[]) {
		const userId = request.decodedInfo.user.id;

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
		const { id } = request.decodedInfo.user;

		return this.cartRepository.getByUserId(id);
	}
}
