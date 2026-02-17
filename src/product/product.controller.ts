import {
	Controller,
	Inject,
	Param,
	Query,
	Body,
	HttpCode,
	Get,
	Post,
	Patch,
	Delete,
} from '@nestjs/common';
import type { ProductService } from './services/product.service.interface.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import {
	UpdateProductPriceDto,
	UpdateProductStockDto,
} from './dto/update-product.dto.js';
// import { UpdateProductDto } from './dto/update-product.dto.js';

@Controller('product')
export class ProductController {
	constructor(
		@Inject('ProductService')
		private readonly productService: ProductService,
	) {}

	@Get()
	findAll() {
		return this.productService.findAll();
	}

	@Get('low-stock')
	findLowStock() {
		return this.productService.findLowStock();
	}

	@Get('search')
	findByName(@Query('name') name: string) {
		//falta manejar el caso de que no venga el query o venga vacío
		if (!name) {
			return [];
		}
		return this.productService.findByName(name);
	}

	@Get(':id')
	findById(@Param('id') id: number) {
		return this.productService.findById(id);
	}

	@Post()
	create(@Body() createProductDto: CreateProductDto) {
		return this.productService.create(createProductDto);
	}

	@Patch(':id/price')
	updatePrice(
		@Param('id') id: number,
		@Body() updatePriceDto: UpdateProductPriceDto,
	) {
		return this.productService.updatePrice(id, updatePriceDto);
	}

	@Patch(':id/replaceStock')
	updateStock(
		@Param('id') id: number,
		@Body() updateStockDto: UpdateProductStockDto,
	) {
		return this.productService.updateStock(id, updateStockDto);
	}

	@Patch(':id/incrementStock')
	incrementStock(
		@Param('id') id: number,
		@Body() updateStockDto: UpdateProductStockDto,
	) {
		return this.productService.incrementStock(id, updateStockDto);
	}

	@Delete(':id')
	@HttpCode(204)
	remove(@Param('id') id: number) {
		return this.productService.remove(id);
	}
}
