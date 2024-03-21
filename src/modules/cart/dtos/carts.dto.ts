import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { WaitingOrderDto } from '@cart-module/dtos/waiting-order.dto';

export class CartDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => WaitingOrderDto)
  @ApiProperty({ type: [WaitingOrderDto] })
  orders: WaitingOrderDto[];
}
