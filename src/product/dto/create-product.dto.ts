import {
	IsNotEmpty,
	IsNumber,
	IsPositive,
	IsString,
	Min,
} from 'class-validator';

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
	@Min(0)
	stock: number;
}
