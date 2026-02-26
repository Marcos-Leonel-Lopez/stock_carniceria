import { Module } from '@nestjs/common';
import { HashService } from './hash/hash.service.js';

@Module({
	providers: [
		{
			provide: 'IHashService', // Usamos un token
			useClass: HashService,
		},
	],
	exports: ['IHashService'], // Exportamos el token, no la clase
})
export class SecurityModule {}
