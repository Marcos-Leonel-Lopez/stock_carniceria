import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { config } from './config/config.js';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true, // Descarta propiedades que no estén en el DTO
			forbidNonWhitelisted: true, // Lanza error si envían propiedades extra
			transform: true, // Transforma el JSON a la clase DTO automáticamente
		}),
	);
	await app.listen(config.port);

	console.log(`🚀 Servidor corriendo en puerto: ${config.port}`);
	console.log(`🌍 Zona horaria configurada: ${config.tz}`);
	console.log(`⌚ Hora actual del servidor: ${new Date().toLocaleString()}`);
}
bootstrap();
