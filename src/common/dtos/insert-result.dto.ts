import { ApiProperty } from '@nestjs/swagger';
import { ObjectLiteral } from 'typeorm';

/**
 * Result object returned by InsertQueryBuilder execution.
 */
export class InsertResultDto {
	/**
	 * Contains inserted entity id.
	 * Has entity-like structure (not just column database name and values).
	 */
	@ApiProperty()
	identifiers: ObjectLiteral[];
	/**
	 * Generated values returned by a database.
	 * Has entity-like structure (not just column database name and values).
	 */
	@ApiProperty()
	generatedMaps: ObjectLiteral[];
	/**
	 * Raw SQL result returned by executed query.
	 */
	@ApiProperty()
	raw: any;
}
