import { Body, Req } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from '@app/common/models/express.model';
import { UserService } from './user.service';
import { RegisterDto } from './dtos/register-dto.dto';
import { InsertResultDto } from '@common/dtos/insert-result.dto';
import { Roles } from '@common/decorators/roles.decorator';
import { Controller, Get, Post } from '@common/decorators/http.decorator';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@ApiOperation({ summary: 'Get all users' })
	@Roles(['admin'])
	get(@Req() request: Request) {
		return request?.session;
	}

	@Post()
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
