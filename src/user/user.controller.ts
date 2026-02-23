import {
	Controller,
	Get,
	Post,
	Body,
	Inject,
	// Patch,
	Param,
	ParseIntPipe,
	Delete,
	Patch,
} from '@nestjs/common';

import type { IUserService } from './services/user.service.interface.js';
import { CreateUserDto } from './dto/create-user.dto.js';

@Controller('user')
export class UserController {
	constructor(
		@Inject('IUserService')
		private readonly userService: IUserService,
	) {}

	@Get()
	findAll() {
		return this.userService.findAll();
	}

	@Get(':id')
	findOneById(@Param('id', ParseIntPipe) id: number) {
		return this.userService.findOneById(id);
	}
	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@Patch(':id/role')
	updateRole(
		@Param('id', ParseIntPipe) id: number,
		@Body('id_rol') id_rol: number,
	) {
		return this.userService.updateRole(id, id_rol);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.userService.remove(id);
	}

	// @Patch(':id')
	// update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
	// 	return this.userService.update(+id, updateUserDto);
	// }

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.userService.remove(+id);
	// }
}
