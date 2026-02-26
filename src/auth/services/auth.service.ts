import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import type { IAuthService } from './auth.service.interface.js';
import type { IUserService } from 'src/user/services/user.service.interface.js';
import type { IHashService } from 'src/security/hash/hash.service.interface.js';

import type { JwtPayload } from '../entities/jwt-payload.entitie.js';
import type { UserAuthResponse } from 'src/user/dto/user-auth.dto.js';
import type { LoginResponse } from '../entities/login-response.entitie.js';

@Injectable()
export class AuthService implements IAuthService {
	constructor(
		@Inject('IUserService')
		private readonly userService: IUserService,
		@Inject('IHashService')
		private readonly hashService: IHashService,

		private readonly jwtService: JwtService,
	) {}

	async validateUser(
		username: string,
		pass: string,
	): Promise<Omit<UserAuthResponse, 'password'> | null> {
		const user = await this.userService.findOneByUsername(username);
		if (!user) {
			return null;
		}
		const isValidate = await this.hashService.comparePassword(
			pass,
			user.password,
		);
		if (user && isValidate) {
			return {
				id: user.id,
				username: user.username,
				rol: user.rol,
			};
		}
		return null;
	}

	async login(
		user: Omit<UserAuthResponse, 'password'>,
	): Promise<LoginResponse> {
		const payload: JwtPayload = {
			username: user.username,
			sub: user.id,
			role: user.rol,
		};
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
