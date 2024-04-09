import { Controller } from '@nestjs/common';
import { ProductCartService } from './product-cart.service';

@Controller('product-cart')
export class ProductCartController {
	constructor(private readonly productCartService: ProductCartService) {}
}
