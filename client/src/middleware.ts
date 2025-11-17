import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API = 'https://localhost:3001';

export async function middleware(req: NextRequest) {
	const url = req.nextUrl.clone();

	const access = req.cookies.get('access_token')?.value;
	const refresh = req.cookies.get('refresh_token')?.value;

	if (url.pathname.startsWith('/login')) {
		return NextResponse.next();
	}

	if (!access && !refresh) {
		url.pathname = '/login';
		return NextResponse.redirect(url);
	}

	const doWhoami = async (token: string) => {
		return fetch(`${API}/whoami`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	};

	if (access) {
		const whoami = await doWhoami(access);

		if (whoami.ok) {
			return NextResponse.next();
		}
	}

	if (refresh) {
		const refreshResp = await fetch(`${API}/auth/refresh`, {
			method: 'POST',
			headers: {
				Cookie: `refresh_token=${refresh}`,
			},
		});

		if (refreshResp.ok) {
			const data = await refreshResp.json();

			const res = NextResponse.next();

			res.cookies.set('access_token', data.access, {
				httpOnly: true,
				secure: true,
				path: '/',
				maxAge: 60 * 60 * 24, // 1 день (пример)
			});

			const whoami = await doWhoami(data.access);
			if (whoami.ok) {
				return res;
			}
		}
	}

	url.pathname = '/login';
	return NextResponse.redirect(url);
}

// ==========================
//  Middleware на всё, кроме login
// ==========================
export const config = {
	matcher: ['/((?!login).*)'],
};
