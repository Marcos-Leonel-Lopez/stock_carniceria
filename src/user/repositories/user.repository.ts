import { Injectable, Inject } from '@nestjs/common';
import type { IUserRepository } from './user.repository.interface.js';
import type { CustomPool } from '../../database/database.types.js';
import type { CreateUserDto } from '../dto/create-user.dto.js';
import type { UserResponse } from '../dto/user-response.dto.js';
import { UserMapper, type UserResponseRow } from './user.mapper.js';

@Injectable()
export class UserRepository implements IUserRepository {
	// Usamos nuestra interfaz CustomPool en lugar del tipo 'Pool' de la librería
	private readonly pool: CustomPool;
	constructor(
		@Inject('PG_POOL')
		pool: any, // Lo recibimos como any para que el inyector no sufra
	) {
		// Lo asignamos a nuestra interfaz controlada
		this.pool = pool as CustomPool;
	}

	async create(user: CreateUserDto): Promise<UserResponse> {
		const result = await this.pool.query<UserResponseRow>(
			`
			WITH inserted_user AS (
				INSERT INTO usuario (nombre, pass, id_rol)
				VALUES ($1, $2, $3)
				RETURNING id_usuario, nombre, id_rol
			)
			SELECT iu.id_usuario, iu.nombre, r.rol
			FROM inserted_user iu
			INNER JOIN rol r ON r.id_rol = iu.id_rol;
			`,
			[user.username, user.password, user.id_rol],
		);
		return UserMapper.toUserResponse(result.rows[0]);
	}

	async findAll(): Promise<UserResponse[]> {
		const result = await this.pool.query<UserResponseRow>(
			`
			SELECT u.id_usuario, u.nombre, r.rol
			FROM usuario u
			INNER JOIN rol r ON r.id_rol = u.id_rol
			ORDER BY u.id_usuario;
			`,
		);
		return result.rows.map((row) => UserMapper.toUserResponse(row));
	}

	async findOneById(id: number): Promise<UserResponse | null> {
		const result = await this.pool.query<UserResponseRow>(
			`
			SELECT u.id_usuario, u.nombre, r.rol
			FROM usuario u
			INNER JOIN rol r ON r.id_rol = u.id_rol
			WHERE u.id_usuario = $1;
			`,
			[id],
		);
		if (result.rows.length === 0) {
			return null;
		}
		return UserMapper.toUserResponse(result.rows[0]);
	}

	async updateRole(id: number, id_rol: number): Promise<UserResponse | null> {
		const result = await this.pool.query<UserResponseRow>(
			`
			WITH updated_user AS (
				UPDATE usuario SET id_rol = $2 
				WHERE id_usuario = $1
				RETURNING id_usuario, nombre, id_rol)
			SELECT uu.id_usuario, uu.nombre, r.rol
			FROM updated_user uu
			INNER JOIN rol r ON r.id_rol = uu.id_rol;
			`,
			[id, id_rol],
		);
		if (result.rows.length === 0) {
			return null;
		}
		return UserMapper.toUserResponse(result.rows[0]);
	}

	async remove(id: number): Promise<void> {
		await this.pool.query('DELETE FROM usuario WHERE id_usuario = $1', [
			id,
		]);
	}
}
