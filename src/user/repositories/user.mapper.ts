import type { UserResponse } from '../dto/user-response.dto.js';

export interface UserResponseRow {
	id_usuario: number;
	nombre: string;
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
}
