import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class AccessTokenDto {
	@IsNotEmpty()
	@IsString()
	@MinLength(100)
	@MaxLength(1000)
	accessToken: string;
}
