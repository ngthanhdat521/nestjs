import { ApiProperty } from '@nestjs/swagger';
import {
	IsEmail,
	IsNotEmpty,
	IsString,
	IsStrongPassword,
	MinLength,
	MaxLength
} from 'class-validator';

export class LoginDto {
	@IsNotEmpty()
	@IsString()
	@MinLength(10)
	@MaxLength(15)
	@IsEmail()
	@ApiProperty()
	email: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(10)
	@MaxLength(15)
	@IsStrongPassword()
	@ApiProperty()
	password: string;
}
