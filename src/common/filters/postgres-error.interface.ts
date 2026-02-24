export interface PostgresError {
	code: string;
	detail?: string;
	table?: string;
	column?: string;
}
