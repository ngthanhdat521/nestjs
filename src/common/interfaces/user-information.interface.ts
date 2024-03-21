import { PublicUserData } from '../dtos/public-user-data.dto';

export interface UserTokenData {
  user: PublicUserData;
  exp?: number;
  iat?: number;
}
