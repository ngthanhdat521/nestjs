import {
  Entity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { ProductCartEntity } from '../product-cart/product-cart.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    nullable: false,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  title: string;

  @Column({
    name: 'price',
    type: 'decimal',
    nullable: false,
  })
  price: number;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  description: string;

  @ManyToMany(() => ProductCartEntity, (productCart) => productCart.cart)
  carts: ProductCartEntity[];
}
