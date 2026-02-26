export interface DatabaseConfig {
	host: string;
	port: number;
	user: string;
	password: string;
	database: string;
}
export interface JwtConfig {
	secret: string;
	expiresIn: number;
}

export interface AppConfig {
	port: string | number;
	db: DatabaseConfig;
	tz: string;
	jwt: JwtConfig;
}
