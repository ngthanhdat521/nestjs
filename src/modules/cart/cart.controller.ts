import { InsertResultDto } from '@common/dtos/insert-result.dto';
import { Body, Req } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CartDto } from '@modules/cart/dtos/carts.dto';
import { CartService } from '@modules/cart/cart.service';
import { Request } from '@app/common/models/express.model';
import { Roles } from '@common/decorators/roles.decorator';
import { Controller, Get, Post } from '@common/decorators/http.decorator';

@Controller('cart')
export class CartController {
	constructor(private readonly cartService: CartService) {}

	@Post()
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
	@ApiOperation({ summary: 'Get list of product in cart of user' })
	@ApiOkResponse({
		type: InsertResultDto
	})
	@Roles(['admin', 'user'])
	getMyCart(@Req() request: Request) {
		return this.cartService.getMyCart(request);
	}
}
