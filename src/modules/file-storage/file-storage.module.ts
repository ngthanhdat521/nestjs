import { Module } from '@nestjs/common';
import { FileStorageService } from './file-storage.service';
import { FileStorageController } from './file-storage.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
	imports: [MulterModule.register({})],
	providers: [FileStorageService],
	controllers: [FileStorageController]
})
export class FileStorageModule {}
