import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from '@modules/auth/auth.controller';
import { AuthService } from '@modules/auth/auth.service';
import { UserService } from '@modules/user/user.service';
import { UsersRepository } from '@modules/user/user.repository';
import { CacheService } from '@modules/cache/cache.service';

@Module({
	imports: [],
	exports: [AuthService, JwtService],
	controllers: [AuthController],
	providers: [AuthService, JwtService, UserService, UsersRepository, CacheService]
})
export class AuthModule {}
