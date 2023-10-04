import MButton from '@/components/MButton';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Login',
	description: 'Login website',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return <div className='h-screen flex justify-center items-center layout-login'>{children}</div>;
}
