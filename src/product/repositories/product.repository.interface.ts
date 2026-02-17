//import type { CreateProductDto } from './dto/create-product.dto.js';
import type { Product } from '../entities/product.entity.js';
import type { CreateProductDto } from '../dto/create-product.dto.js';
import type {
	UpdateProductPriceDto,
	UpdateProductStockDto,
} from '../dto/update-product.dto.js';

export interface ProductRepository {
	findAll(): Promise<Product[]>;
	findLowStock(): Promise<Product[]>;
	findById(id: number): Promise<Product | null>;
	findByName(name: string): Promise<Product[]>;
	checkExistence(id: number): Promise<boolean>;
	create(product: CreateProductDto): Promise<Product | null>;
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
	remove(id: number): Promise<void>;
}
