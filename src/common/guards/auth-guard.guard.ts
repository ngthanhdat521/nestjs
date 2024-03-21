import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
	ForbiddenException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { EMPTY_TOKEN_ERROR, EMPTY_TOKEN_MESSAGE } from '@constants/exception.constant';
import { Roles } from '@decorators/roles.decorater';
import { UserTokenData } from '@interfaces/user-information.interface';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly reflector: Reflector
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const roles = this.reflector.get(Roles, context.getHandler());
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);
		if (!token) {
			throw new ForbiddenException(EMPTY_TOKEN_ERROR, EMPTY_TOKEN_MESSAGE);
		}

		let payload: UserTokenData | null = null;

		try {
			payload = await this.jwtService.verifyAsync<UserTokenData>(token, {
				secret: process.env.SECRET_JWT
			});
		} catch (error) {
			throw new UnauthorizedException();
		}

		if (payload && !roles.includes(payload.user.role)) {
			throw new UnauthorizedException('Unauthorized', 'Role is invalid !');
		}

		// 💡 We're assigning the payload to the request object here
		// so that we can access it in our route handlers
		request['session'] = payload;

		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const { authorization = '' } = request.headers;
		const [type, token] = authorization.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
