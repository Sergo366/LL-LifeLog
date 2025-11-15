import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Life | Login page',
	description: 'Login page',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
