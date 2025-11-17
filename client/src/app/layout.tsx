import type { Metadata } from 'next';
import QueryProvider from '@/shared/providers/QueryProvider/QueryProvider';

export const metadata: Metadata = {
	title: 'Life | Home page',
	description: 'Home page',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body style={{ margin: 0 }}>
				<QueryProvider>{children}</QueryProvider>
			</body>
		</html>
	);
}
