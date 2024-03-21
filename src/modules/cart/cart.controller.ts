import { InsertResultDto } from '@common-dtos/insert-result.dto';
import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	UseFilters,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CartDto } from './dtos/carts.dto';
import { CartService } from './cart.service';
import { AuthGuard } from '@guards/auth-guard.guard';
import { GlobalExceptionFilter } from '@filters/global-exception-filters.filter';
import { Request } from '@models/request.model';
import { Roles } from '@decorators/roles.decorater';
import { applyDecorators } from '@nestjs/common';

export function Auth(role: string) {
	return applyDecorators(ApiBearerAuth(), () => console.log('applyDecorators', role));
}

@Controller('cart')
@ApiTags('cart')
@UseGuards(AuthGuard)
@UseFilters(GlobalExceptionFilter)
@UsePipes(new ValidationPipe({ transform: true }))
export class CartController {
	constructor(private readonly cartService: CartService) {}

	@Post()
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Create a new product into the cart of user' })
	@ApiBody({
		type: CartDto
	})
	@ApiOkResponse({
		type: InsertResultDto
	})
	@Roles(['admin'])
	post(@Body() data: CartDto, @Req() request: Request) {
		return this.cartService.insertCartForNewUser(request, data.orders);
	}

	@Get()
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Get list of product in cart of user' })
	@ApiOkResponse({
		type: InsertResultDto
	})
	@Roles(['admin', 'user'])
	getMyCart(@Req() request: Request) {
		return this.cartService.getMyCart(request);
	}
}
