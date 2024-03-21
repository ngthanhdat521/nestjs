import { Roles } from '@app/common/decorators/roles.decorater';
import { GlobalExceptionFilter } from '@app/common/filters/global-exception-filters.filter';
import { AuthGuard } from '@app/common/guards/auth-guard.guard';
import {
	Controller,
	ForbiddenException,
	Injectable,
	PipeTransform,
	Post,
	UseFilters,
	UseGuards,
	UseInterceptors,
	UsePipes
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
	ApiBearerAuth,
	ApiBody,
	ApiConsumes,
	ApiOkResponse,
	ApiOperation,
	ApiProperty,
	ApiTags
} from '@nestjs/swagger';

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
@ApiTags('file-storage')
@UseGuards(AuthGuard)
@UseFilters(GlobalExceptionFilter)
export class FileStorageController {
	constructor() {}
	@Post()
	@ApiBearerAuth()
	@ApiConsumes('multipart/form-data')
	@ApiOperation({ summary: 'Create a new file' })
	@ApiBody({
		type: UploadFileDto,
		required: true
	})
	// @ApiOkResponse({
	// 	type: string
	// })
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
