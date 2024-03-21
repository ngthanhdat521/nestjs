import { CartEntity } from '@cart-module/cart.entity';
import { ProductEntity } from '@product-module/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'product_carts' })
export class ProductCartEntity {
  @PrimaryColumn({
    type: 'uuid',
    name: 'id',
    nullable: false,
  })
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => CartEntity, (cart) => cart.carts)
  @JoinColumn({
    name: 'cart_id',
  })
  cart: CartEntity;

  @ManyToOne(() => ProductEntity, (product) => product.carts)
  @JoinColumn({
    name: 'product_id',
  })
  product: ProductEntity;

  @Column({
    name: 'quantity',
    type: 'int',
    nullable: false,
  })
  quantity: number;
}
