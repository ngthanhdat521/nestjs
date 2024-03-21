import { GlobalExceptionFilter } from '@filters/global-exception-filters.filter';
import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	UnauthorizedException,
	UseFilters,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiBody,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags
} from '@nestjs/swagger';
import { AuthGuard } from '@guards/auth-guard.guard';
import { Request } from '@models/request.model';
import { UserService } from './user.service';
import { RegisterDto } from './dtos/register-dto.dto';
import { InsertResultDto } from '@common-dtos/insert-result.dto';
import { Roles } from '@decorators/roles.decorater';
import { CacheService } from '../cache';

@Controller('user')
@ApiTags('user')
@UseGuards(AuthGuard)
@UseFilters(GlobalExceptionFilter)
@UsePipes(new ValidationPipe({ transform: true }))
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly cacheService: CacheService
	) {}

	@Get()
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Get all users' })
	@Roles(['admin'])
	get(@Req() request: Request) {
		return request?.session;
	}

	@Get('error')
	@ApiParam({ name: 'id', type: String })
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Get error users' })
	@Roles(['admin'])
	getError(): string {
		throw new UnauthorizedException();
	}

	@Get('setredis')
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Set data redis' })
	@Roles(['admin'])
	async setRedis() {
		const value = Date.now().toString();
		await this.cacheService.set('test', value, 20);
		return 'set data :' + value;
	}

	@Get('getredis')
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Get data redis' })
	@Roles(['admin'])
	async getRedis() {
		const value = await this.cacheService.get('test');
		return 'get data :' + value;
	}

	@Post()
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Create a new user' })
	@ApiBody({
		type: RegisterDto
	})
	@ApiOkResponse({
		type: InsertResultDto
	})
	@Roles(['admin'])
	post(@Body() newUser: RegisterDto): Promise<InsertResultDto> {
		return this.userService.insert(newUser);
	}
}
