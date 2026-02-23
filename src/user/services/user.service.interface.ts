import { CreateUserDto } from '../dto/create-user.dto.js';
import type { UserResponse } from '../dto/user-response.dto.js';

export interface IUserService {
	create(user: CreateUserDto): Promise<UserResponse>;
	findAll(): Promise<UserResponse[]>;
	findOneById(id: number): Promise<UserResponse>;
	// findOneByUsername(username: string): Promise<UserResponse>;
	updateRole(id: number, id_rol: number): Promise<UserResponse>;
	remove(id: number): Promise<void>;
}
