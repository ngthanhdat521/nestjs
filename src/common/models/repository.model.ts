import { SQLException } from '@exceptions/sql-exception.exception';
import { Injectable } from '@nestjs/common';
import {
	FindManyOptions,
	FindOneOptions,
	InsertResult,
	ObjectLiteral,
	Repository as TypeOrmRepository
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class Repository<Entity extends ObjectLiteral> extends TypeOrmRepository<Entity> {
	async insertMany(entities: Array<Entity>): Promise<InsertResult> {
		try {
			const results = await this.insert(entities as QueryDeepPartialEntity<Entity>[]);

			return results;
		} catch (error) {
			throw new SQLException({
				cause: error,
				description: error?.['detail'] || 'Fail to insert a new user!'
			});
		}
	}

	async insertOne(entity: Entity): Promise<InsertResult> {
		try {
			const result = await this.insert(entity as QueryDeepPartialEntity<Entity>);

			return result;
		} catch (error) {
			throw new SQLException({
				cause: error,
				description: error?.['detail'] || 'Fail to insert a new user!'
			});
		}
	}

	async saveOne(entity: Entity): Promise<Entity> {
		try {
			const result = await this.save(entity);

			return result;
		} catch (error) {
			console.log(error);
			throw new SQLException({
				cause: error,
				description: error?.['detail'] || 'Fail to insert a new user!'
			});
		}
	}

	async selectOne(options: FindOneOptions<Entity>): Promise<Entity | null> {
		try {
			const result = await this.findOne(options);

			return result;
		} catch (error) {
			console.log('error', error);
			throw new SQLException({
				cause: error,
				description: error?.['detail'] || 'Fail to query select !'
			});
		}
	}

	async selectMany(options?: FindManyOptions<Entity>): Promise<Entity[]> {
		try {
			const results = await this.find(options);

			return results;
		} catch (error) {
			throw new SQLException({
				cause: error,
				description: error?.['detail'] || 'Fail to query select !'
			});
		}
	}
}
