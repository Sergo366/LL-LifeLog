import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/entities/Header';

export const metadata: Metadata = {
	title: 'Life | Home page',
	description: 'Home page',
};

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header />
			{children}
		</>
	);
}
