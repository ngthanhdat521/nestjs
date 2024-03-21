import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { CartEntity } from '@cart-module/cart.entity';

@Entity('users')
export class UserEntity {
	@PrimaryColumn({
		type: 'uuid',
		name: 'id',
		nullable: false
	})
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		name: 'email',
		type: 'varchar',
		length: 255,
		unique: true,
		nullable: false
	})
	email: string;

	@Column({
		name: 'password',
		type: 'varchar',
		length: 255,
		nullable: false
	})
	password: string;

	@Column({
		name: 'role',
		type: 'varchar',
		length: 10,
		nullable: false
	})
	role: string;

	@Column({
		name: 'created_at',
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
		nullable: false
	})
	createdAt: Date;

	@OneToOne(() => CartEntity, (cart) => cart.user)
	cart: CartEntity;
}
