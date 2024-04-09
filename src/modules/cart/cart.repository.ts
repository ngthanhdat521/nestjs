import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CartEntity } from './cart.entity';
import { Repository } from '@models/repository.model';
import { PostgresException } from '@app/common/exceptions/postgres.exception';

@Injectable()
export class CartRepository extends Repository<CartEntity> {
	constructor(private dataSource: DataSource) {
		super(CartEntity, dataSource.createEntityManager());
	}

	public async getByUserId(userId: string): Promise<CartEntity[]> {
		try {
			const queryBuilder = this.createQueryBuilder('cart');

			queryBuilder.innerJoinAndSelect('cart.user', 'user', 'cart.user_id = :userId', {
				userId
			});
			queryBuilder.select(['cart.id', 'cart.createdAt', 'user.id']);

			const results = await queryBuilder.getMany();

			return results;
		} catch (error) {
			throw new PostgresException({
				cause: error,
				description: error?.['detail'] || 'Fail to insert a new user!'
			});
		}
	}
}
