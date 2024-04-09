import { ResponseMessage } from '@common/enums/response.enum';

export class HttpResponse<T> {
	private status: number;
	private data: T;
	private message: string;

	constructor(status: number, data: T, message: string = ResponseMessage.SUCCESS) {
		this.status = status;
		this.data = data;
		this.message = message;
	}
}
