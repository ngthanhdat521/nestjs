import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource, InsertResult } from 'typeorm';
import { UserEntity } from '@user-module/user.entity';
import { Brypt } from '@models/brypt.model';
import { Repository } from '@models/repository.model';
import { PublicUserData } from '@app/common/dtos/public-user-data.dto';
import {
	NOT_EXIST_ACCOUNT_ERROR,
	NOT_EXIST_ACCOUNT_MESSAGE
} from '@app/common/constants/exception.constant';

@Injectable()
export class UsersRepository extends Repository<UserEntity> {
	constructor(private dataSource: DataSource) {
		super(UserEntity, dataSource.createEntityManager());
	}

	/**
	 * Check email and password is valid
	 * @param email
	 * @param password
	 * @returns
	 */
	async checkUserAccount(email: string, checkedPassword: string): Promise<PublicUserData> {
		const result = await this.selectOne({
			where: {
				email
			},
			select: ['id', 'email', 'password', 'role', 'createdAt']
		});

		if (result) {
			const { password = '', ...user } = result;
			const isUserCorrect = await Brypt.comparePassword(checkedPassword, password);

			if (isUserCorrect) {
				return user;
			}

			throw new UnauthorizedException(NOT_EXIST_ACCOUNT_MESSAGE, NOT_EXIST_ACCOUNT_ERROR);
		}

		throw new UnauthorizedException(NOT_EXIST_ACCOUNT_MESSAGE, NOT_EXIST_ACCOUNT_ERROR);
	}

	async insertNewUser(user: UserEntity): Promise<InsertResult> {
		user.password = await Brypt.hashPassword(user.password);

		const result = await this.insertOne(user);
		return result;
	}
}
