import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource, InsertResult } from 'typeorm';
import { UserEntity } from '@modules/user/user.entity';
import { Brypt } from '@common/models/brypt.model';
import { Repository } from '@common/models/repository.model';
import { PublicUserData } from '@common/dtos/public-user-data.dto';
import { AuthError } from '@app/common/enums/error.enum';

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
		}

		throw new UnauthorizedException(AuthError.TITLE, AuthError.INVALID_USER);
	}

	async insertNewUser(user: UserEntity): Promise<InsertResult> {
		user.password = await Brypt.hashPassword(user.password);

		const result = await this.insertOne(user);
		return result;
	}
}
