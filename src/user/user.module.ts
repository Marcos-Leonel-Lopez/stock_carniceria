import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository.js';
import { UserService } from './services/user.service.js';
import { UserController } from './controller/user.controller.js';
import { SecurityModule } from '../security/security.module.js';

@Module({
	controllers: [UserController],
	providers: [
		{
			provide: 'IUserRepository',
			useClass: UserRepository,
		},
		{
			provide: 'IUserService',
			useClass: UserService,
		},
	],
	imports: [SecurityModule],
	exports: ['IUserService'],
})
export class UserModule {}
