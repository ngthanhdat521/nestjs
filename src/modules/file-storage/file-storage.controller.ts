import {
	ForbiddenException,
	Injectable,
	PipeTransform,
	UseInterceptors,
	UsePipes
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { Roles } from '@common/decorators/roles.decorator';
import { Controller, Post } from '@common/decorators/http.decorator';

@Injectable()
export class ImageValidationPipe implements PipeTransform {
	transform(file: Express.Multer.File, _: any) {
		console.log(file);
		throw new ForbiddenException();

		return file;
	}
}

export class UploadFileDto {
	@ApiProperty({ type: 'string', format: 'binary' })
	file: Express.Multer.File;
}

@Controller('file-storage')
export class FileStorageController {
	constructor() {}
	@Post()
	@ApiConsumes('multipart/form-data')
	@ApiOperation({ summary: 'Create a new file' })
	@ApiBody({
		type: UploadFileDto,
		required: true
	})
	@Roles(['admin'])
	@UsePipes(ImageValidationPipe)
	@UseInterceptors(
		FileInterceptor('file', {
			dest: 'upload3'
		})
	)
	post() {
		return true;
	}
}
