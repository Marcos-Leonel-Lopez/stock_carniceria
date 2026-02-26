import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';

import { config } from '../../config/config.js';
import type { JwtPayload } from '../entities/jwt-payload.entitie.js';
import type { IUserService } from '../../user/services/user.service.interface.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@Inject('IUserService')
		private readonly userService: IUserService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: config.jwt.secret,
		});
	}

	async validate(payload: JwtPayload) {
		const user = await this.userService.findOneById(payload.sub);
		if (!user) {
			throw new UnauthorizedException(
				'User no longer exists or is inactive',
			);
		}
		return {
			id: payload.sub,
			username: payload.username,
			role: payload.role,
		};
	}
}
