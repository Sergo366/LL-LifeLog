import { z } from 'zod';

export const formNames = {
	login: 'login',
	password: 'password',
} as const;

export const loginValidationSchema = z.object({
	[formNames.login]: z
		.string({ error: 'Login is required' })
		.min(4, { message: 'Минимум 4 символа' }),

	[formNames.password]: z
		.string({ error: 'Password is required' })
		.min(6, { message: 'Минимум 6 символов' }),
});

export type LoginType = z.infer<typeof loginValidationSchema>;
