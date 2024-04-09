import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
	ForbiddenException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserTokenData } from '@interfaces/user-information.interface';
import { ConfigService } from '@nestjs/config';
import { AuthError, ForbiddenAuthError } from '../enums/error.enum';

@Injectable()
export class AuthenticationGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);

		if (!token) {
			throw new ForbiddenException(
				ForbiddenAuthError.TITLE,
				ForbiddenAuthError.NOT_FOUND_TOKEN
			);
		}

		try {
			const payload = await this.jwtService.verifyAsync<UserTokenData>(token, {
				secret: this.configService.get('SECRET_JWT')
			});

			request.decodedUser = payload;
		} catch (error) {
			throw new UnauthorizedException(AuthError.TITLE, AuthError.INVALID_TOKEN);
		}

		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const { authorization = '' } = request.headers;
		const [type, token] = authorization.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
