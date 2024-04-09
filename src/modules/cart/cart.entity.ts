import {
	Entity,
	Column,
	PrimaryColumn,
	PrimaryGeneratedColumn,
	JoinColumn,
	OneToMany,
	OneToOne
} from 'typeorm';
import { ProductCartEntity } from '@modules/product-cart/product-cart.entity';
import { UserEntity } from '@modules/user/user.entity';

@Entity('carts')
export class CartEntity {
	@PrimaryColumn({
		type: 'uuid',
		name: 'id',
		nullable: false
	})
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@OneToOne(() => UserEntity, (user) => user.cart)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity;

	@Column({
		name: 'created_at',
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
		nullable: false
	})
	createdAt: Date;

	@OneToMany(() => ProductCartEntity, (product) => product.cart)
	carts: ProductCartEntity[];
}
