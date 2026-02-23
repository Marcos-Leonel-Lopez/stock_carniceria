import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductModule } from './product/product.module.js';
import { DatabaseModule } from './database/database.module.js';
import { UserModule } from './user/user.module.js';
import { SecurityModule } from './security/security.module.js';

@Module({
	imports: [ProductModule, DatabaseModule, UserModule, SecurityModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
