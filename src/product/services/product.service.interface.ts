import { Product } from '../entities/product.entity.js';
import { CreateProductDto } from '../dto/create-product.dto.js';
import {
	UpdateProductPriceDto,
	UpdateProductStockDto,
} from '../dto/update-product.dto.js';

export interface ProductService {
	findAll(): Promise<Product[]>;
	findLowStock(): Promise<Product[]>;
	findById(id: number): Promise<Product | null>;
	findByName(name: string): Promise<Product[]>;
	create(createProductDto: CreateProductDto): Promise<Product | null>;
	updatePrice(
		id: number,
		price: UpdateProductPriceDto,
	): Promise<Product | null>;
	updateStock(
		id: number,
		stock: UpdateProductStockDto,
	): Promise<Product | null>;
	incrementStock(
		id: number,
		stock: UpdateProductStockDto,
	): Promise<Product | null>;
	// update(id: number, updateProductDto: UpdateProductDto): Promise<void>;
	remove(id: number): Promise<void>;
}
