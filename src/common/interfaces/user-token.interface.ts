import { PublicUserData } from '../dtos/public-user-data.dto';

/**
 * Status User Token interface for saving all user infromation to logout or refresh new access token
 */
interface StatusUserToken {
	status: boolean;
	accessToken: string;
	refreshToken: string;
	user: PublicUserData;
}

/**
 * Status User Token List for saving user token with unique key
 */
export type StatusUserTokenList = {
	[refreshToken in string]: StatusUserToken;
};
