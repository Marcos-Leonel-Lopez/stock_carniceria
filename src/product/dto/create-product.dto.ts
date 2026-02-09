import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
	@IsNotEmpty()
	@IsNumber()
	@IsPositive()
	id: number;

	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsNumber()
	@IsPositive()
	price: number;

	@IsNotEmpty()
	@IsNumber()
	@IsPositive()
	stock: number;
}
