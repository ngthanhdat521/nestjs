import { Body, Res, Render } from '@nestjs/common';
import { Response } from 'express';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from '@modules/auth/auth.service';
import { LoginDto } from '@modules/auth/dtos/login-dto.dto';
import { RefreshTokenDto } from '@modules/auth/dtos/refresh-token-dto.dto';
import { UserTokenDto } from '@modules/auth/dtos/user-token.dto';
import { AccessTokenDto } from '@modules/auth/dtos/access-token-dto.dto';
import { Controller, Post, Get } from '@common/decorators/http.decorator';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	@ApiOkResponse({
		type: UserTokenDto
	})
	@ApiOperation({ summary: 'Login system' })
	@ApiBody({
		type: LoginDto
	})
	async login(@Body() loginDto: LoginDto) {
		const { email, password } = loginDto;
		return this.authService.login(email, password);
	}

	@Post('refresh-token')
	@ApiOkResponse({
		type: AccessTokenDto
	})
	@ApiBody({
		type: RefreshTokenDto
	})
	@ApiOperation({ summary: 'Refresh token' })
	refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<AccessTokenDto> {
		const { refreshToken } = refreshTokenDto;
		return this.authService.refresh(refreshToken);
	}

	@Get('test')
	async test(@Res() response: Response) {
		return response.redirect('https://www.google.com/');
	}

	@Get('test2')
	@Render('index')
	test2() {
		return { message: 'Hello world!' };
	}
}
