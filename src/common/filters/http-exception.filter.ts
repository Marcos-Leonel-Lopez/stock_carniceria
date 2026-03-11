import {
	Catch,
	type ExceptionFilter,
	type ArgumentsHost,
	HttpStatus,
	HttpException,
} from '@nestjs/common';
import type { PostgresError } from './postgres-error.interface.js';
import type { Request, Response } from 'express';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		// Cambiamos any por unknown
		const ctx = host.switchToHttp();
		const request = ctx.getRequest<Request>();
		const response = ctx.getResponse<Response>();

		let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
		let message: string = 'Internal server error';
		let errorType: string = 'SystemError';

		// 1. Comprobación segura para HttpException (NestJS)
		if (exception instanceof HttpException) {
			status = exception.getStatus();
			const res = exception.getResponse();
			// Extraemos el mensaje de forma segura
			if (typeof res === 'object' && res !== null && 'message' in res) {
				// En NestJS, el cuerpo suele ser { message: string | string[], error: string, statusCode: number }
				console.log(res);
				const msg = (res as { message: unknown }).message;
				message = Array.isArray(msg) ? msg.join(', ') : String(msg);
			} else {
				message = JSON.stringify(res);
			}
			errorType = 'HttpError';
		}

		// 2. Comprobación segura para errores de Base de Datos (PostgreSQL)
		else if (this.isPostgresError(exception)) {
			errorType = 'DataBaseError';
			// Ahora TS sabe que exception tiene la propiedad .code
			switch (exception.code) {
				case '23505':
					status = HttpStatus.CONFLICT;
					message = 'Conflict: Duplicate entry';
					break;
				case '23503':
					status = HttpStatus.BAD_REQUEST;
					message = 'Bad Request: Foreign key violation';
					break;
				case '22P02':
					status = HttpStatus.BAD_REQUEST;
					message = 'Bad Request: Invalid input syntax';
					break;
				default:
					status = HttpStatus.INTERNAL_SERVER_ERROR;
					message = 'Database error';
					break;
			}
		}

		response.status(status).json({
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
			message,
			error: errorType,
		});
	}

	// Función auxiliar (Type Guard) para identificar errores de Postgres
	private isPostgresError(error: unknown): error is PostgresError {
		return (
			typeof error === 'object' &&
			error !== null &&
			'code' in error &&
			typeof (error as PostgresError).code === 'string'
		);
	}
}
