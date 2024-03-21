import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { ProductDto } from './product.dto';
import { Type } from 'class-transformer';

export class ProductsDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  @ApiProperty({ type: [ProductDto] })
  products: ProductDto[];
}
