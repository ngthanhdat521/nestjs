import { Global, Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
	providers: [CacheService, ConfigService]
})
export class CacheModule {}
