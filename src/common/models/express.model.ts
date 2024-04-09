import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { UserTokenData } from '@interfaces/user-information.interface';

export type Request = ExpressRequest & { decodedInfo: UserTokenData };
export type Response = ExpressResponse;
