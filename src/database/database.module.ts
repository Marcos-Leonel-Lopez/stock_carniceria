import { Module, Global, type Provider } from '@nestjs/common';
import { Pool, type PoolConfig } from 'pg';
import { config } from '../config/config.js';

const poolProvider: Provider = {
	provide: 'PG_POOL',
	useFactory: (): Pool => {
		const poolConfig: PoolConfig = {
			host: config.db.host,
			port: config.db.port,
			user: config.db.user,
			password: config.db.password,
			database: config.db.database,
		};

		const pool = new Pool(poolConfig);

		pool.on('connect', (client) => {
			client
				.query(`SET TIME ZONE '${config.tz}'`)
				.catch((err) =>
					console.error('Error al setear zona horaria:', err),
				);
		});
		return pool;
		// // eslint-disable-next-line @typescript-eslint/no-unsafe-call
		// return new Pool(poolConfig);
	},
};

@Global()
@Module({
	providers: [poolProvider],
	exports: ['PG_POOL'],
})
export class DatabaseModule {}
