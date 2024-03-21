import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User1706412751363 } from './migrations/1706412751363-user';
// import { Book1707635652785 } from './migrations/1707635652785-book';
import { UserEntity } from '../user/user.entity';
import { CartEntity } from '../cart/cart.entity';
import { ProductCartEntity } from '../product-cart/product-cart.entity';
import { ProductEntity } from '../product/product.entity';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get<string>('DB_HOST'),
				port: configService.get<number>('DB_PORT'),
				username: configService.get<string>('DB_USERNAME'),
				password: configService.get<string>('DB_PASSWORD'),
				database: configService.get<string>('DB_NAME'),
				schema: configService.get<string>('DB_SCHEMA'),
				autoLoadEntities: true,
				migrationsTableName: `migrations`,
				// migrations: [User1706412751363, Book1707635652785],
				migrationsRun: true,
				synchronize: false,
				entities: [UserEntity, CartEntity, ProductCartEntity, ProductEntity]
			})
		})
	]
})
export class DatabaseModule {}
