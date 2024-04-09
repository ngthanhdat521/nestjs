import { Injectable } from '@nestjs/common';
import { InsertResult } from 'typeorm';
import { ProductCartRepository } from '@modules/product-cart/product-cart.repository';
import { WaitingOrderDto } from '@modules/cart/dtos/waiting-order.dto';
import { ProductCartEntity } from '@modules/product-cart/product-cart.entity';
import { ProductEntity } from '@modules/product/product.entity';
import { CartEntity } from '@modules/cart/cart.entity';

@Injectable()
export class ProductCartService {
	constructor(private readonly productCartRepository: ProductCartRepository) {}

	insertManyProductCarts(cartId: string, orders: WaitingOrderDto[]): Promise<InsertResult> {
		const newOrders: ProductCartEntity[] = orders.map(({ productId, quatity }) => {
			const parsedOrder = new ProductCartEntity();

			const productInOrder = new ProductEntity();
			productInOrder.id = productId;

			const cartInOrder = new CartEntity();
			cartInOrder.id = cartId;

			parsedOrder.quantity = quatity;
			parsedOrder.product = productInOrder;
			parsedOrder.cart = cartInOrder;

			return parsedOrder;
		});

		return this.productCartRepository.insertMany(newOrders);
	}
}
