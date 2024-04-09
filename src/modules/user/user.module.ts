import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './user.repository';
import { CacheService } from '@modules/cache/cache.service';

@Module({
	imports: [TypeOrmModule.forFeature([UsersRepository])],
	exports: [UserService],
	controllers: [UserController],
	providers: [UserService, UsersRepository, CacheService]
})
export class UserModule {}
