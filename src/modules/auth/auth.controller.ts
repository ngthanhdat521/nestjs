import { GlobalExceptionFilter } from '@filters/global-exception-filters.filter';
import { Body, Controller, Post, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '@auth-module/auth.service';
import { LoginDto } from '@auth-module/dtos/login-dto.dto';
import { RefreshTokenDto } from '@auth-module/dtos/refresh-token-dto.dto';
import { UserTokenDto } from '@auth-module/dtos/user-token.dto';
import { AccessTokenDto } from '@auth-module/dtos/access-token-dto.dto';

@Controller('auth')
@ApiTags('auth')
@UseFilters(GlobalExceptionFilter)
@UsePipes(new ValidationPipe({ transform: true }))
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	@ApiOkResponse({
		type: UserTokenDto
	})
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Login system' })
	@ApiBody({
		type: LoginDto
	})
	login(@Body() loginDto: LoginDto): Promise<UserTokenDto> {
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
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Refresh token' })
	refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<AccessTokenDto> {
		const { refreshToken } = refreshTokenDto;
		return this.authService.refresh(refreshToken);
	}

	@Post('test')
	// @ApiOkResponse({
	// 	type: AccessTokenDto
	// })
	// @ApiBody({
	// 	type: RefreshTokenDto
	// })
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Refresh token' })
	test() {
		return this.authService.register({
			email: 'test@gmail.com',
			firstName: 'test',
			lastName: 'abc',
			password: '123'
		});
	}
}
