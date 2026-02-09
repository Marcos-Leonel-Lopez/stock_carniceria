import { Module } from '@nestjs/common';
import { ProductServiceImpl } from './services/product.service.js';
import { ProductPgRepository } from './repositories/product.repository.js';
import { ProductController } from './product.controller.js';

@Module({
	controllers: [ProductController],
	providers: [
		{
			provide: 'ProductRepository',
			useClass: ProductPgRepository,
		},
		{
			provide: 'ProductService',
			useClass: ProductServiceImpl,
		},
	],
})
export class ProductModule {}
