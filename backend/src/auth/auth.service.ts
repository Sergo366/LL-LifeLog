import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthMethod, User } from '@prisma/__generated__';
import { verify } from 'argon2';
import { Request, Response } from 'express';
import { LoginDto } from '@/auth/dto/login.dto';
import { RegisterDto } from '@/auth/dto/register.dto';
import { UserService } from '@/user/user.service';

@Injectable()
export class AuthService {
	public constructor(
		private readonly userService: UserService,
		private readonly configService: ConfigService
	) {}

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

	public async login(req: Request, dto: LoginDto) {
		const user = await this.userService.findByEmail(dto.email);

		if (!user || !user.password) {
			throw new NotFoundException('User not found. Please check your data');
		}

		const isValidPassword = await verify(user.password, dto.password);
		if (!isValidPassword) {
			throw new UnauthorizedException(
				'Password is incorrect. Please try again or reset your password.'
			);
		}

		return this.saveSession(req, user);
	}

	public async logout(req: Request, res: Response): Promise<void> {
		return new Promise((resolve, reject) => {
			req.session.destroy(err => {
				if (err) {
					return reject(
						new InternalServerErrorException(
							'Failed to destroy session. Please check your session configuration.'
						)
					);
				}

				res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'));
				resolve();
			});
		});
	}

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
