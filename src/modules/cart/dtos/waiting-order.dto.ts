import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsUUID } from 'class-validator';

export class WaitingOrderDto {
	@IsNotEmpty()
	@IsString()
	@IsUUID()
	@ApiProperty()
	productId: string;

	@IsNotEmpty()
	@IsInt()
	@ApiProperty()
	quatity: number;
}
