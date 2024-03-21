import { LoggerMiddleware } from '@common';
import { ConfigModule } from '@modules/configs';
import { CronModule } from '@modules/cron';
import { DatabaseModule } from '@modules/database';
import { I18NModule } from '@modules/i18n';
import { JwtModule } from '@modules/jwt';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { providers } from './app.provider';
import { UserModule } from '@user-module/user.module';
import { AuthModule } from '@auth-module/auth.module';
import { ProductModule } from '@product-module/product.module';
import { CartModule } from '@cart-module/cart.module';
import { ProductCartModule } from '@product-cart-module/product-cart.module';
import { FileStorageModule } from 'src/modules/file-storage/file-storage.module';
import { CacheModule } from '@cache-module/cache.module';
// import { ApiModule } from '@apis/api.module';

@Module({
	imports: [
		ConfigModule,
		CacheModule,
		CronModule,
		DatabaseModule,
		JwtModule,
		EventEmitterModule.forRoot({
			maxListeners: 20
		}),
		I18NModule,
		CqrsModule.forRoot(),
		// ApiModule,
		UserModule,
		AuthModule,
		ProductModule,
		CartModule,
		ProductCartModule,
		FileStorageModule
	],
	controllers: [AppController],
	providers
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
