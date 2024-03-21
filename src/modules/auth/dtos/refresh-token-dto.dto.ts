import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(100)
  @MaxLength(1000)
  refreshToken: string;
}
