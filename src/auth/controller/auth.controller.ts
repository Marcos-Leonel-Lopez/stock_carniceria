import { Controller, Inject, Req, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import type { IAuthService } from '../services/auth.service.interface.js';
import type { UserAuthResponse } from 'src/user/dto/user-auth.dto.js';

@Controller('auth')
export class AuthController {
	constructor(
		@Inject('IAuthService') private readonly authService: IAuthService,
	) {}

	@UseGuards(AuthGuard('local')) // Dispara LocalStrategy
	@Post('login')
	async login(@Req() req: { user: Omit<UserAuthResponse, 'password'> }) {
		return this.authService.login(req.user);
	}
}
