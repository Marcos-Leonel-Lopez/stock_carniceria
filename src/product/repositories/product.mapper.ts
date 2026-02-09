import type { Product } from '../entities/product.entity.js';

// Definimos la interfaz para que el mapper sepa qué recibe
export interface ProductRow {
	id_producto: number;
	nombre: string;
	precio: number;
	stock: number;
	fecha_modificacion: Date;
}

export class ProductMapper {
	static toProduct(row: ProductRow): Product {
		return {
			id: row.id_producto,
			name: row.nombre,
			price: row.precio,
			stock: row.stock,
			updatedAt: row.fecha_modificacion,
		};
	}
}
