import {
	ConflictException,
	Injectable,
	InternalServerErrorException
} from '@nestjs/common';
import { AuthMethod, User } from '@prisma/__generated__';
import { Request } from 'express';
import { RegisterDto } from '@/auth/dto/register.dto';
import { UserService } from '@/user/user.service';

@Injectable()
export class AuthService {
	public constructor(private readonly userService: UserService) {}

	public async register(req: Request, dto: RegisterDto) {
		const isExist = await this.userService.findByEmail(dto.email);

		if (isExist) {
			throw new ConflictException(
				'Email is already in use. Please choose another one.'
			);
		}
		const newUser = await this.userService.create(
			dto.email,
			dto.name,
			dto.password,
			'',
			AuthMethod.CREDENTIALS,
			false
		);

		return this.saveSession(req, newUser);
	}

	public async login() {}

	public async logout() {}

	public async saveSession(req: Request, user: User) {
		return new Promise((res, rej) => {
			req.session.userId = user.id;

			req.session.save(err => {
				if (err) {
					return rej(
						new InternalServerErrorException(
							'Failed to save session. Please check your session configuration.'
						)
					);
				}
				res(user);
			});
		});
	}
}
