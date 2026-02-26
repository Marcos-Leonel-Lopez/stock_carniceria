import type { CreateUserDto } from '../dto/create-user.dto.js';
import type { UserResponse } from '../dto/user-response.dto.js';
import type { UserAuthResponse } from '../dto/user-auth.dto.js';

export interface IUserRepository {
	create(user: CreateUserDto): Promise<UserResponse>;
	findAll(): Promise<UserResponse[]>;
	findOneById(id: number): Promise<UserResponse | null>;
	findOneByUsername(username: string): Promise<UserAuthResponse | null>;
	updateRole(id: number, id_rol: number): Promise<UserResponse | null>;
	remove(id: number): Promise<void>;
}
