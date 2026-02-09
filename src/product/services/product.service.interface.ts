import { Product } from '../entities/product.entity.js';
import { CreateProductDto } from '../dto/create-product.dto.js';

export interface ProductService {
	findAll(): Promise<Product[]>;
	findLowStock(): Promise<Product[]>;
	findById(id: number): Promise<Product | null>;
	findByName(name: string): Promise<Product[]>;
	create(createProductDto: CreateProductDto): Promise<Product | null>;
	// update(id: number, updateProductDto: UpdateProductDto): Promise<void>;
	// remove(id: number): Promise<void>;
}
