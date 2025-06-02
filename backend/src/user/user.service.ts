import { Injectable, NotFoundException } from '@nestjs/common';
import { $Enums } from '@prisma/__generated__';
import { hash } from 'argon2';
import { PrismaService } from '@/prisma/prisma.service';

import AuthMethod = $Enums.AuthMethod;

@Injectable()
export class UserService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async findById(id: string) {
		const user = await this.prismaService.user.findUnique({
			where: { id },
			include: { accounts: true }
		});

		if (!user) {
			throw new NotFoundException(
				`User is not found. Please check entered data`
			);
		}
		return user;
	}

	public async findByEmail(email: string) {
		return await this.prismaService.user.findUnique({
			where: { email },
			include: { accounts: true }
		});
	}

	public async create(
		email: string,
		password: string,
		displayName: string,
		picture: string,
		method: AuthMethod,
		isVerified: boolean
	) {
		return await this.prismaService.user.create({
			data: {
				email,
				password: password ? await hash(password) : '',
				displayName,
				picture,
				method,
				isVerified
			},
			include: {
				accounts: true
			}
		});
	}
}
