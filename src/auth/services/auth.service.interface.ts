import type { LoginResponse } from '../entities/login-response.entitie.js';
import type { UserAuthResponse } from '../../user/dto/user-auth.dto.js';

export interface IAuthService {
	validateUser(
		username: string,
		pass: string,
	): Promise<Omit<UserAuthResponse, 'password'> | null>;
	login(user: Omit<UserAuthResponse, 'password'>): Promise<LoginResponse>;
}
