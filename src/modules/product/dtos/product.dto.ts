import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(10)
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1000)
  @Max(1000000)
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  @ApiProperty()
  description: string;
}
