import { ApiProperty } from '@nestjs/swagger';

export class PublicUserData {
	@ApiProperty()
	id: string;

	@ApiProperty()
	email: string;

	@ApiProperty()
	role: string;

	@ApiProperty()
	createdAt: Date;
}
