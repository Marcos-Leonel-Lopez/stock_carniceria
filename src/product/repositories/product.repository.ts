import { Inject, Injectable } from '@nestjs/common';
// Importamos la clase Pool solo para usarla como token,
// pero usaremos una interfaz propia para el tipado.
import type { IProductRepository } from './product.repository.interface.js';
import type { CustomPool } from '../../database/database.types.js';
import {
	ProductMapper,
	type ProductRow,
	type ListProductRow,
} from './product.mapper.js';

import { Product } from '../entities/product.entity.js';
import { CreateProductDto } from '../dto/create-product.dto.js';
import {
	UpdateProductPriceDto,
	UpdateProductStockDto,
} from '../dto/update-product.dto.js';
import { ProductListItemDto } from '../dto/list-item-product.dto.js';

@Injectable()
export class ProductRepository implements IProductRepository {
	// Usamos nuestra interfaz CustomPool en lugar del tipo 'Pool' de la librería
	private readonly pool: CustomPool;

	constructor(
		@Inject('PG_POOL')
		pool: any, // Lo recibimos como any para que el inyector no sufra
	) {
		// Lo asignamos a nuestra interfaz controlada
		this.pool = pool as CustomPool;
	}

	async findAll(): Promise<Product[]> {
		const result = await this.pool.query<ProductRow>(
			'SELECT id_producto, nombre, precio, stock, fecha_modificacion FROM producto ORDER BY id_producto',
		);
		return result.rows.map((row) => ProductMapper.toProduct(row));
	}

	async findAllList(): Promise<ProductListItemDto[]> {
		const result = await this.pool.query<ListProductRow>(
			'SELECT id_producto, nombre FROM producto ORDER BY id_producto',
		);
		return result.rows.map((row) => ProductMapper.toListItem(row));
	}

	async findLowStock(): Promise<Product[]> {
		const result = await this.pool.query<ProductRow>(
			'SELECT id_producto, nombre, precio, stock, fecha_modificacion FROM producto ORDER BY stock, id_producto',
		);
		return result.rows.map((row) => ProductMapper.toProduct(row));
	}

	async findByName(name: string): Promise<Product[] | null> {
		const searchTerm = `%${name}%`;
		const result = await this.pool.query<ProductRow>(
			'SELECT id_producto, nombre, precio, stock, fecha_modificacion FROM producto WHERE nombre ILIKE $1 ORDER BY nombre, id_producto',
			[searchTerm],
		);
		if (result.rows.length === 0) {
			return null;
		}
		return result.rows.map((row) => ProductMapper.toProduct(row));
	}

	async findById(id: number): Promise<Product | null> {
		const result = await this.pool.query<ProductRow>(
			'SELECT id_producto, nombre, precio, stock, fecha_modificacion FROM producto WHERE id_producto = $1',
			[id],
		);
		if (result.rows.length === 0) {
			return null;
		}
		return ProductMapper.toProduct(result.rows[0]);
	}

	async checkExistence(id: number): Promise<boolean> {
		const result = await this.pool.query<{ count: number }>(
			'SELECT COUNT(1) AS count FROM producto WHERE id_producto = $1',
			[id],
		);
		return result.rows[0].count > 0;
	}

	async create(product: CreateProductDto): Promise<Product | null> {
		const result = await this.pool.query<ProductRow>(
			'INSERT INTO producto (id_producto, nombre, precio, stock, fecha_modificacion) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *',
			[
				product.id,
				product.name.toUpperCase(),
				product.price,
				product.stock,
			],
		);
		return ProductMapper.toProduct(result.rows[0]);
	}

	async updatePrice(
		id: number,
		price: UpdateProductPriceDto,
	): Promise<Product | null> {
		const result = await this.pool.query<ProductRow>(
			'UPDATE producto SET precio = $1, fecha_modificacion = CURRENT_TIMESTAMP WHERE id_producto = $2 RETURNING *',
			[price.price, id],
		);
		return ProductMapper.toProduct(result.rows[0]);
	}

	async updateStock(
		id: number,
		stock: UpdateProductStockDto,
	): Promise<Product | null> {
		const result = await this.pool.query<ProductRow>(
			'UPDATE producto SET stock = $1, fecha_modificacion = CURRENT_TIMESTAMP WHERE id_producto = $2 RETURNING *',
			[stock.stock, id],
		);
		return ProductMapper.toProduct(result.rows[0]);
	}

	async incrementStock(
		id: number,
		stock: UpdateProductStockDto,
	): Promise<Product | null> {
		const result = await this.pool.query<ProductRow>(
			'UPDATE producto SET stock = stock + $1, fecha_modificacion = CURRENT_TIMESTAMP WHERE id_producto = $2 RETURNING *',
			[stock.stock, id],
		);
		return ProductMapper.toProduct(result.rows[0]);
	}

	async remove(id: number): Promise<void> {
		await this.pool.query('DELETE FROM producto WHERE id_producto = $1', [
			id,
		]);
	}
}
