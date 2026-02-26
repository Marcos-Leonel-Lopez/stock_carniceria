import { IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	password: string;
}
