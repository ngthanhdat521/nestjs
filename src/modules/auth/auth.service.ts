import { UserTokenData } from '@interfaces/user-information.interface';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserTokenDto } from '@modules/auth/dtos/user-token.dto';
import { StatusUserTokenList } from '@interfaces/user-token.interface';
import { AccessTokenDto } from '@modules/auth/dtos/access-token-dto.dto';
import { UserService } from '@modules/user/user.service';
import { AuthError, ForbiddenAuthError } from '@app/common/enums/error.enum';

@Injectable()
export class AuthService {
	public static tokenList: StatusUserTokenList = {};

	constructor(
		private readonly jwtService: JwtService,
		private readonly userService: UserService
	) {}

	public async login(email: string, checkedPassword: string): Promise<UserTokenDto> {
		const user = await this.userService.checkUserAccount(email, checkedPassword);

		if (user) {
			// TODO: Generate a JWT and return it here
			// instead of the user object
			const payload: UserTokenData = {
				user
			};

			const accessToken = await this.jwtService.signAsync(payload, {
				secret: process.env.SECRET_JWT,
				expiresIn: '30m'
			});

			const refreshToken = await this.jwtService.signAsync(payload, {
				secret: process.env.RERESH_SECRET_JWT,
				expiresIn: '30m'
			});

			/**
			 * Save locally user token in server
			 */
			AuthService.tokenList[refreshToken] = {
				status: true,
				user,
				accessToken,
				refreshToken
			};

			return {
				accessToken,
				refreshToken
			};
		}

		throw new UnauthorizedException(AuthError.TITLE, AuthError.INVALID_USER);
	}

	public async refresh(refreshToken: string): Promise<AccessTokenDto> {
		const userToken = AuthService.tokenList[refreshToken];
		/**
		 * Check if refresh token has existed
		 */
		if (userToken) {
			const payload: UserTokenData = {
				user: userToken.user
			};

			const accessToken = await this.jwtService.signAsync(payload, {
				secret: process.env.SECRET_JWT,
				expiresIn: '30m'
			});

			AuthService.tokenList[refreshToken].accessToken = accessToken;

			return {
				accessToken
			};
		}

		throw new ForbiddenException(
			ForbiddenAuthError.TITLE,
			ForbiddenAuthError.NOT_FOUND_REFRESH_TOKEN
		);
	}

	public async register() {
		return true;
	}
}
