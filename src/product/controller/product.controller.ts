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
	ParseIntPipe,
	UseGuards,
	Request,
} from '@nestjs/common';
import type { IProductService } from '../services/product.service.interface.js';
import { CreateProductDto } from '../dto/create-product.dto.js';
import {
	UpdateProductPriceDto,
	UpdateProductStockDto,
} from '../dto/update-product.dto.js';
import { AuthGuard } from '@nestjs/passport';
// import { UpdateProductDto } from './dto/update-product.dto.js';

@Controller('product')
export class ProductController {
	constructor(
		@Inject('IProductService')
		private readonly productService: IProductService,
	) {}

	@UseGuards(AuthGuard('jwt'))
	@Get()
	findAll() {
		return this.productService.findAll();
	}

	@Get('list')
	findAllList() {
		return this.productService.findAllList();
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
	findById(@Param('id', ParseIntPipe) id: number) {
		return this.productService.findById(id);
	}

	@Post()
	create(@Body() createProductDto: CreateProductDto) {
		return this.productService.create(createProductDto);
	}

	@Patch(':id/price')
	updatePrice(
		@Param('id', ParseIntPipe) id: number,
		@Body() updatePriceDto: UpdateProductPriceDto,
	) {
		return this.productService.updatePrice(id, updatePriceDto);
	}

	@Patch(':id/replaceStock')
	updateStock(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateStockDto: UpdateProductStockDto,
	) {
		return this.productService.updateStock(id, updateStockDto);
	}

	@Patch(':id/incrementStock')
	incrementStock(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateStockDto: UpdateProductStockDto,
	) {
		return this.productService.incrementStock(id, updateStockDto);
	}

	@Delete(':id')
	@HttpCode(204)
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.productService.remove(id);
	}
}
