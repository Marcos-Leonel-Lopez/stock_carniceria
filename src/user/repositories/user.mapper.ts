import type { UserResponse } from '../dto/user-response.dto.js';
import type { UserAuthResponse } from '../dto/user-auth.dto.js';

export interface UserResponseRow {
	id_usuario: number;
	nombre: string;
	rol: string;
}

export interface AuthUserRow {
	id_usuario: number;
	nombre: string;
	pass: string;
	rol: string;
}

export class UserMapper {
	static toUserResponse(row: UserResponseRow): UserResponse {
		return {
			id: row.id_usuario,
			username: row.nombre,
			rol: row.rol,
		};
	}

	static toAuthUser(row: AuthUserRow): UserAuthResponse {
		return {
			id: row.id_usuario,
			username: row.nombre,
			password: row.pass,
			rol: row.rol,
		};
	}
}
