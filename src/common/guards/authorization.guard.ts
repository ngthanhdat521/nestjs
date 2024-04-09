import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '@common/decorators/roles.decorator';
import { Request } from '@common/models/express.model';
import { AuthError } from '../enums/error.enum';

@Injectable()
export class AuthorizationGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const roles = this.reflector.get(Roles, context.getHandler());
		const { decodedInfo } = context.switchToHttp().getRequest<Request>();

		if (!roles.includes(decodedInfo.user.role)) {
			throw new UnauthorizedException(AuthError.TITLE, AuthError.INVALID_PERMISSION);
		}

		return true;
	}
}
