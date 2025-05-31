import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const isLoggedIn = request.cookies.get('token');
	// const isRoot = new URL(request.url).pathname === '/';

	// if the user is not logged in and is trying to access a protected route, redirect them to the login page
	// if (!isLoggedIn && !isRoot) {
	//   return NextResponse.redirect(new URL('/', request.url));
	// }
}

export const config = {
	matcher: ['/((?!_next|favicon.ico|api|static).*)'],
};
