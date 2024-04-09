import { Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { VNPayService } from './vnpay.service';
import { Request, Response } from '@common/models/express.model';
import { Roles } from '@common/decorators/roles.decorator';
import { Controller, Post } from '@common/decorators/http.decorator';

@Controller('vnpay')
export class VNPayController {
	constructor(private readonly vnpayService: VNPayService) {}

	@Post()
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Get all users' })
	@Roles(['admin'])
	async post(@Req() request: Request, @Res() response: Response) {
		return this.vnpayService.createVNPayUrl(request, response);
	}
}
