import { Injectable } from '@nestjs/common';
import { config, pathEnv } from './config/config.js';

@Injectable()
export class AppService {
	getHello(): string {
		const dir = pathEnv;
		console.log(`Leyendo el archivo de entorno en la ruta: ${dir}`);
		const puerto = config.port;
		console.log(
			`El servidor está configurado para ejecutarse en el puerto: ${puerto}`,
		);
		return 'Hello World!';
	}
}
