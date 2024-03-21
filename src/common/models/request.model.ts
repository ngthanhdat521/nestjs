import { Request as ExpressRequest } from 'express';
import { UserTokenData } from '@interfaces/user-information.interface';

export type Request = ExpressRequest & { session: UserTokenData };
