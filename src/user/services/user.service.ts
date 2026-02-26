import { Injectable, Inject } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception.js';

import type { IUserService } from './user.service.interface.js';
import type { IUserRepository } from '../repositories/user.repository.interface.js';
import type { IHashService } from 'src/security/hash/hash.service.interface.js';

import { CreateUserDto } from '../dto/create-user.dto.js';
import type { UserResponse } from '../dto/user-response.dto.js';
import type { UserAuthResponse } from '../dto/user-auth.dto.js';

@Injectable()
export class UserService implements IUserService {
	constructor(
		@Inject('IUserRepository')
		private readonly repository: IUserRepository,

		@Inject('IHashService')
		private readonly hashService: IHashService,
	) {}
	async create(createUserDto: CreateUserDto) {
		const hashedPassword = await this.hashService.hashPassword(
			createUserDto.password,
		);
		return await this.repository.create({
			...createUserDto,
			password: hashedPassword,
		});
	}

	async findAll() {
		return this.repository.findAll();
	}

	async findOneById(id: number): Promise<UserResponse> {
		const user = await this.repository.findOneById(id);
		if (!user) {
			throw new NotFoundException(
				`The user with ID ${id} does not exist.`,
			);
		}
		return user;
	}

	async findOneByUsername(username: string): Promise<UserAuthResponse> {
		const user = await this.repository.findOneByUsername(username);
		if (!user) {
			throw new NotFoundException(
				`The user with username ${username} does not exist.`,
			);
		}
		return user;
	}

	async updateRole(id: number, id_rol: number): Promise<UserResponse> {
		const user = await this.repository.updateRole(id, id_rol);
		if (!user) {
			throw new NotFoundException(
				`The user with ID ${id} does not exist.`,
			);
		}
		return user;
	}

	async remove(id: number): Promise<void> {
		await this.repository.remove(id);
	}
}
