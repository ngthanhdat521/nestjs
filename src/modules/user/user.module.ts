import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './user.repository';
import { CacheService } from '../cache/cache.service';
import { MetadataKey } from '@app/common/constants';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Module({
	imports: [TypeOrmModule.forFeature([UsersRepository])],
	exports: [UserService],
	controllers: [UserController],
	providers: [
		UserService,
		UsersRepository,
		CacheService,
		{
			provide: MetadataKey.REDIS,
			useFactory(config: ConfigService) {
				return new Redis({
					port: config.get('REDIS_PORT'),
					host: config.get('REDIS_HOST'),
					db: config.get('REDIS_DB'),
					password: config.get('REDIS_PASSWORD'),
					keyPrefix: config.get('REDIS_PREFIX')
				});
			},
			inject: [ConfigService]
		}
	]
})
export class UserModule {}
