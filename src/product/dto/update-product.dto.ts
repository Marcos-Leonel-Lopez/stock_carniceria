import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto.js';
import { IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';

// Actualiza todos los campos de un producto.
export class UpdateProductDto extends PartialType(CreateProductDto) {}

// Actualiza solo el precio de un producto.
export class UpdateProductPriceDto {
	@IsNotEmpty()
	@IsNumber()
	@IsPositive()
	price: number;
}

export class UpdateProductStockDto {
	@IsNotEmpty()
	@IsNumber()
	@Min(0)
	stock: number;
}
