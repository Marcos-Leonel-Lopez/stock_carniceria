export interface DatabaseConfig {
	host: string;
	port: number;
	user: string;
	password: string;
	database: string;
}

export interface AppConfig {
	port: string | number;
	db: DatabaseConfig;
	tz: string;
}
