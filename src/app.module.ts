import { AuthModule } from '@modules/auth/auth.module';
import { CronModule } from '@modules/cron';
import { ConfigModule } from '@modules/configs';
import { DatabaseModule } from '@modules/database';
import { I18NModule } from '@modules/i18n';
import { JwtModule } from '@modules/jwt';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from '@app/app.controller';
import { providers } from '@app/app.provider';
import { UserModule } from '@modules/user/user.module';
import { ProductModule } from '@modules/product/product.module';
import { CartModule } from '@modules/cart/cart.module';
import { ProductCartModule } from '@modules/product-cart/product-cart.module';
import { FileStorageModule } from 'src/modules/file-storage/file-storage.module';
import { CacheModule } from '@modules/cache/cache.module';
import { VNPayModule } from '@modules/vnpay/vnpay.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { HelmetMiddleware } from '@middlewares/helmet.middleware';
import { LoggerMiddleware } from '@middlewares/logger.middleware';
import { CorsMiddleware } from '@middlewares/cors.middleware';

@Module({
	imports: [
		ThrottlerModule.forRoot([
			{
				ttl: 1000,
				limit: 1
			}
		]),
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
		UserModule,
		AuthModule,
		ProductModule,
		CartModule,
		ProductCartModule,
		FileStorageModule,
		VNPayModule
	],
	controllers: [AppController],
	providers
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(CorsMiddleware, HelmetMiddleware, LoggerMiddleware).forRoutes('*');
	}
}
