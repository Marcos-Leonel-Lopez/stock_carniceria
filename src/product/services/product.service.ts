import {
	Injectable,
	Inject,
	ConflictException,
	NotFoundException,
} from '@nestjs/common';
import type { IProductService } from './product.service.interface.js';
import type { IProductRepository } from '../repositories/product.repository.interface.js';

import { Product } from '../entities/product.entity.js';
import { CreateProductDto } from '../dto/create-product.dto.js';
import {
	UpdateProductPriceDto,
	UpdateProductStockDto,
} from '../dto/update-product.dto.js';
import { ProductListItemDto } from '../dto/list-item-product.dto.js';
// import { UpdateProductDto } from '../dto/update-product.dto.js';

@Injectable()
export class ProductService implements IProductService {
	constructor(
		@Inject('IProductRepository')
		private readonly repository: IProductRepository,
	) {}

	async findAll(): Promise<Product[]> {
		return this.repository.findAll();
	}

	async findAllList(): Promise<ProductListItemDto[]> {
		return this.repository.findAllList();
	}

	async findLowStock(): Promise<Product[]> {
		return this.repository.findLowStock();
	}

	async findByName(name: string): Promise<Product[]> {
		const products = await this.repository.findByName(name);
		if (!products) {
			throw new NotFoundException(
				`No se encontraron productos con el nombre "${name}".`,
			);
		}
		return products;
	}

	async findById(id: number): Promise<Product> {
		const product = await this.repository.findById(id);
		if (!product) {
			// PENDIENTE: lanzar una excepción personalizada
			throw new NotFoundException(`El producto con ID ${id} no existe.`);
		}
		return product;
	}

	async create(createProductDto: CreateProductDto): Promise<Product | null> {
		const exists = await this.repository.checkExistence(
			createProductDto.id,
		);
		if (exists) {
			// PENDIENTE: lanzar una excepción personalizada
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
			throw new NotFoundException(`El producto con ID ${id} no existe.`);
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
			throw new NotFoundException(`El producto con ID ${id} no existe.`);
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
			throw new NotFoundException(`El producto con ID ${id} no existe.`);
		}
		return this.repository.incrementStock(id, stock);
	}

	async remove(id: number) {
		const exists = await this.repository.checkExistence(id);
		if (!exists) {
			// PENDIENTE: lanzar una excepción personalizada
			throw new NotFoundException(`El producto con ID ${id} no existe.`);
		}
		return this.repository.remove(id);
	}
}
