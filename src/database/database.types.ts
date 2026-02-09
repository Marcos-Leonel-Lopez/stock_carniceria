export interface CustomPool {
	query<T>(sql: string, params?: any[]): Promise<{ rows: T[] }>;
}
