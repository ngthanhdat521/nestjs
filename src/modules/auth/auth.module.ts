import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UsersRepository } from '@user-module/user.repository';

@Module({
	imports: [],
	exports: [AuthService, JwtService],
	controllers: [AuthController],
	providers: [AuthService, JwtService, UserService, UsersRepository]
})
export class AuthModule {}
