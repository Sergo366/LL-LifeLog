import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Life | Login page',
	description: 'Home page',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="login-layout">{children}</body>
		</html>
	);
}
