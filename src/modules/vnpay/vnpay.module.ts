import { Module } from '@nestjs/common';
import { VNPayController } from '@modules/vnpay/vnpay.controller';
import { VNPayService } from '@modules/vnpay/vnpay.service';

@Module({
	providers: [VNPayService],
	controllers: [VNPayController]
})
export class VNPayModule {}
