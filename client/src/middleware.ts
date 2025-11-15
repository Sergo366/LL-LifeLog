import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API = 'https://localhost:3001';

export async function middleware(req: NextRequest) {
	const url = req.nextUrl.clone();

	const access = req.cookies.get('access_token')?.value;
	const refresh = req.cookies.get('refresh_token')?.value;

	// 1. Пропускаем /login
	if (url.pathname.startsWith('/')) {
		return NextResponse.next();
	}

	// 2. Нет токенов — сразу редирект на логин
	if (!access && !refresh) {
		url.pathname = '/login';
		return NextResponse.redirect(url);
	}

	// Функция: делаем whoami-запрос
	const doWhoami = async (token: string) => {
		return fetch(`${API}/whoami`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	};

	// ============================
	// 3. Пробуем валидировать access токен
	// ============================
	if (access) {
		const whoami = await doWhoami(access);

		if (whoami.ok) {
			// Пользователь валидный → пропускаем
			return NextResponse.next();
		}
	}

	// ============================
	// 4. Access протух → пробуем обновить refresh токеном
	// ============================

	if (refresh) {
		const refreshResp = await fetch(`${API}/auth/refresh`, {
			method: 'POST',
			headers: {
				Cookie: `refresh_token=${refresh}`,
			},
		});

		if (refreshResp.ok) {
			const data = await refreshResp.json();

			// создаём ответ
			const res = NextResponse.next();

			// сохраняем новый access токен
			res.cookies.set('access_token', data.access, {
				httpOnly: true,
				secure: true,
				path: '/',
				maxAge: 60 * 60 * 24, // 1 день (пример)
			});

			// Делаем повторный whoami
			const whoami = await doWhoami(data.access);

			if (whoami.ok) {
				return res;
			}
		}
	}

	// ============================
	// 5. Все токены протухли → редирект на login
	// ============================
	url.pathname = '/login';
	return NextResponse.redirect(url);
}

// ==========================
//  Middleware на всё, кроме login
// ==========================
export const config = {
	matcher: ['/((?!login).*)'],
};
