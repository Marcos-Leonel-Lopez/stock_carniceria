import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';

import type { IHashService } from './hash.service.interface.js';

@Injectable()
export class HashService implements IHashService {
	private readonly saltRounds = 10;

	async hashPassword(password: string): Promise<string> {
		return await bcrypt.hash(password, this.saltRounds);
	}

	async comparePassword(password: string, hash: string): Promise<boolean> {
		return await bcrypt.compare(password, hash);
	}
}
