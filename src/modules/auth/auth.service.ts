import { UserTokenData } from '@interfaces/user-information.interface';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
	NOT_EXIST_ACCOUNT_ERROR,
	NOT_EXIST_ACCOUNT_MESSAGE,
	NOT_EXIST_REFRESH_TOKEN_ERROR,
	NOT_EXIST_REFRESH_TOKEN_MESSAGE
} from '@constants/exception.constant';
import { UserTokenDto } from '@auth-module/dtos/user-token.dto';
import { StatusUserTokenList } from '@interfaces/user-token.interface';
import { AccessTokenDto } from '@auth-module/dtos/access-token-dto.dto';
import { UserService } from '../user/user.service';
import { Client as OktaClient, User } from '@okta/okta-sdk-nodejs';
import OktaAuth from '@okta/okta-auth-js';

export interface IRegisterData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface IRegistrationResponse {
	id: string;
}

// const oktaClient = new OktaClient({
// 	orgUrl: 'https://dev-40358439-admin.okta.com',
// 	token: 'DjI3ToRq9CmRsVmjGoRmUIkO5g6XrVekTShMnfS0GvRXqdYqyt8igV8MXR8Iq7Hz',
// 	clientId: '0oafw7q1j9mkZMtJ05d7'
// });

const oktaAuthClient = new OktaAuth({
	issuer: `https://dev-40358439.okta.com`
});

// export interface ISession {
// 	sessionId: string;
// 	userId: string;
// 	userEmail: string;
// }

// export async function sessionLogin(loginData: ILoginData): Promise<ISession> {
// 	const { email: username, password } = loginData;
// 	const { sessionToken } = await oktaAuthClient.signIn({ username, password });

// 	const session = await oktaClient.createSession({ sessionToken });
// 	const { login, id, userId } = session;

// 	return { sessionId: id, userEmail: login, userId };
// }

// export async function getSessionBySessionId(sessionId: string): Promise<ISession> {
// 	const session = await oktaClient.getSession(sessionId);
// 	const { login, id, userId } = session;

// 	return { sessionId: id, userEmail: login, userId };
// }

// Okta verify

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

		throw new UnauthorizedException(NOT_EXIST_ACCOUNT_MESSAGE, {
			description: NOT_EXIST_ACCOUNT_ERROR
		});
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
			NOT_EXIST_REFRESH_TOKEN_ERROR,
			NOT_EXIST_REFRESH_TOKEN_MESSAGE
		);
	}

	public async register(registerData: IRegisterData) {
		const { email, firstName, lastName, password } = registerData;

		const oktaClient = new OktaClient({
			orgUrl: 'https://dev-40358439.okta.com/oauth2/default',
			token: '00T1sku5rxpohTIMc5d7',
			// authorizationMode: 'PrivateKey',
			clientId: '0oafw7q1j9mkZMtJ05d7'
			// scopes: [],
			// privateKey: 'JWTTOKEN', // <-- see notes below
			// keyId: '1'
		});

		// const createdUser = await oktaClient.userApi.createUser({
		// 	body: {
		// 		profile: { email, login: email, firstName, lastName },
		// 		credentials: { password: { value: password } }
		// 	}
		// });

		// const data = await oktaAuthClient.signIn({
		// 	username: 'system_admin@gmail.com',
		// 	password: 'Demo@12345678'
		// });

		const session = await oktaClient.sessionApi.createSession({
			createSessionRequest: {
				sessionToken: 'test'
			}
		});

		console.log('token auth', session);

		return true;
	}
}
