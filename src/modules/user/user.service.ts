import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UsersRepository } from '@user-module/user.repository';
import { RegisterDto } from '@user-module/dtos/register-dto.dto';
import { InsertResultDto } from '@common-dtos/insert-result.dto';
import { PublicUserData } from '@app/common/dtos/public-user-data.dto';

@Injectable()
export class UserService {
	constructor(private readonly usersRepository: UsersRepository) {}

	/**
	 * Check email and password is valid
	 * @param email
	 * @param password
	 * @returns
	 */
	checkUserAccount(email: string, password: string): Promise<PublicUserData> {
		return this.usersRepository.checkUserAccount(email, password);
	}

	async insert(newUser: RegisterDto): Promise<InsertResultDto> {
		const user = new UserEntity();
		user.email = newUser.email;
		user.password = newUser.password;
		user.role = newUser.role;

		return this.usersRepository.insertNewUser(user);
	}

	findUser(id: string) {
		return this.usersRepository.selectOne({
			where: {
				id
			}
		});
	}
}
