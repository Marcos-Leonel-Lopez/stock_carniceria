import { IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class CreateUserDto {
	@IsNotEmpty()
	username: string;
	@IsNotEmpty()
	@MinLength(6)
	password: string;
	@IsNotEmpty()
	@IsNumber()
	id_rol: number;
}
