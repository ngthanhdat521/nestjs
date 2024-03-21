import { Injectable } from '@nestjs/common';
import { ProductCartRepository } from './product-cart.repository';
import { WaitingOrderDto } from '@cart-module/dtos/waiting-order.dto';
import { ProductCartEntity } from './product-cart.entity';
import { InsertResult } from 'typeorm';
import { ProductEntity } from '@product-module/product.entity';
import { CartEntity } from '@cart-module/cart.entity';

@Injectable()
export class ProductCartService {
  constructor(private readonly productCartRepository: ProductCartRepository) {}

  insertManyProductCarts(
    cartId: string,
    orders: WaitingOrderDto[],
  ): Promise<InsertResult> {
    const newOrders: ProductCartEntity[] = orders.map(
      ({ productId, quatity }) => {
        const parsedOrder = new ProductCartEntity();

        const productInOrder = new ProductEntity();
        productInOrder.id = productId;

        const cartInOrder = new CartEntity();
        cartInOrder.id = cartId;

        parsedOrder.quantity = quatity;
        parsedOrder.product = productInOrder;
        parsedOrder.cart = cartInOrder;

        return parsedOrder;
      },
    );

    return this.productCartRepository.insertMany(newOrders);
  }
}
