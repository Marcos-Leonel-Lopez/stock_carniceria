import path from 'path';
import dotenv from 'dotenv';
import __dirname from '../config/utils.js';
import type { AppConfig } from './config.interface.js';

export const pathEnv = path.join(__dirname, '../../.env.development');

dotenv.config({ path: pathEnv });

//puerto conexion
const PORT = process.env.PORT ?? 3000;
//configuracion base de datos
const DB_HOST = process.env.DB_HOST ?? 'localhost';
const DB_PORT = Number(process.env.DB_PORT ?? 5432);
const DB_USER = process.env.DB_USER ?? 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD ?? '';
const DB_NAME = process.env.DB_NAME ?? '';
const TIMEZONE = process.env.TIMEZONE ?? 'UTC';
//configuracion jwt
const JWT_SECRET = process.env.JWT_SECRET ?? 'mysecretkey';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '3600s';

export const config: AppConfig = {
	port: PORT,
	db: {
		host: DB_HOST,
		port: DB_PORT,
		user: DB_USER,
		password: DB_PASSWORD,
		database: DB_NAME,
	},
	tz: TIMEZONE,
	jwt: {
		secret: JWT_SECRET,
		expiresIn: parseInt(JWT_EXPIRES_IN, 10),
	},
};
