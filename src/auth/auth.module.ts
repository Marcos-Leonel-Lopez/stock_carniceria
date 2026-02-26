import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './services/auth.service.js';
import { AuthController } from './controller/auth.controller.js';
import { UserModule } from '../user/user.module.js';
import { SecurityModule } from '../security/security.module.js';
import { LocalStrategy } from './strategies/local.strategy.js';
import { config } from '../config/config.js';
import { JwtStrategy } from './strategies/jwt.strategy.js';

@Module({
	imports: [
		UserModule,
		SecurityModule,
		PassportModule,
		JwtModule.register({
			secret: config.jwt.secret,
			signOptions: { expiresIn: config.jwt.expiresIn },
		}),
	],
	controllers: [AuthController],
	providers: [
		{
			provide: 'IAuthService',
			useClass: AuthService,
		},
		LocalStrategy,
		JwtStrategy,
	],
	//De ser necesario
	//exports: ['IAuthService'],
})
export class AuthModule {}
