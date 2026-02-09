import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductModule } from './product/product.module.js';
import { DatabaseModule } from './database/database.module.js';

@Module({
	imports: [ProductModule, DatabaseModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
