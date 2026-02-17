import { Injectable, Inject, ConflictException } from '@nestjs/common';
import type { ProductService } from './product.service.interface.js';
import type { ProductRepository } from '../repositories/product.repository.interface.js';

import { Product } from '../entities/product.entity.js';
import { CreateProductDto } from '../dto/create-product.dto.js';
import {
	UpdateProductPriceDto,
	UpdateProductStockDto,
} from '../dto/update-product.dto.js';
// import { UpdateProductDto } from '../dto/update-product.dto.js';

@Injectable()
export class ProductServiceImpl implements ProductService {
	constructor(
		@Inject('ProductRepository')
		private readonly repository: ProductRepository,
	) {}

	async findAll(): Promise<Product[]> {
		return this.repository.findAll();
	}

	async findLowStock(): Promise<Product[]> {
		return this.repository.findLowStock();
	}

	findByName(name: string): Promise<Product[]> {
		return this.repository.findByName(name);
	}

	async findById(id: number): Promise<Product | null> {
		return this.repository.findById(id);
	}

	async create(createProductDto: CreateProductDto): Promise<Product | null> {
		const exists = await this.repository.checkExistence(
			createProductDto.id,
		);
		if (exists) {
			// PENDIENTE: lanzar una excepción personalizada
			//return null;
			throw new ConflictException(
				`El producto con ID ${createProductDto.id} ya existe.`,
			);
		}
		return this.repository.create(createProductDto);
	}

	async updatePrice(
		id: number,
		price: UpdateProductPriceDto,
	): Promise<Product | null> {
		const exists = await this.repository.checkExistence(id);
		if (!exists) {
			// PENDIENTE: lanzar una excepción personalizada
			throw new ConflictException(`El producto con ID ${id} no existe.`);
		}
		return this.repository.updatePrice(id, price);
	}

	async updateStock(
		id: number,
		stock: UpdateProductStockDto,
	): Promise<Product | null> {
		const exists = await this.repository.checkExistence(id);
		if (!exists) {
			// PENDIENTE: lanzar una excepción personalizada
			throw new ConflictException(`El producto con ID ${id} no existe.`);
		}
		return this.repository.updateStock(id, stock);
	}

	async incrementStock(
		id: number,
		stock: UpdateProductStockDto,
	): Promise<Product | null> {
		const exists = await this.repository.checkExistence(id);
		if (!exists) {
			// PENDIENTE: lanzar una excepción personalizada
			throw new ConflictException(`El producto con ID ${id} no existe.`);
		}
		return this.repository.incrementStock(id, stock);
	}
	// update(id: number, updateProductDto: UpdateProductDto) {
	// 	return `This action updates a #${id} product`;
	// }

	async remove(id: number) {
		const exists = await this.repository.checkExistence(id);
		if (!exists) {
			// PENDIENTE: lanzar una excepción personalizada
			throw new ConflictException(`El producto con ID ${id} no existe.`);
		}
		return this.repository.remove(id);
	}
}
