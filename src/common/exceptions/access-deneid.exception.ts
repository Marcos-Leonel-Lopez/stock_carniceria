import { ForbiddenException } from '@nestjs/common';

export class AccessDeniedException extends ForbiddenException {
	constructor() {
		super(
			'Access denied. You do not have permission to perform this action.',
		);
	}
}
