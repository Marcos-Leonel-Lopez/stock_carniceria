import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service.js';
import { ProductRepository } from './repositories/product.repository.js';
import { ProductController } from './controller/product.controller.js';

@Module({
	controllers: [ProductController],
	providers: [
		{
			provide: 'IProductRepository',
			useClass: ProductRepository,
		},
		{
			provide: 'IProductService',
			useClass: ProductService,
		},
	],
})
export class ProductModule {}
