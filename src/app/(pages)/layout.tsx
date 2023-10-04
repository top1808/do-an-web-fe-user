import MLayoutUser from '@/layout/user/MLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Login',
	description: 'Login admin',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return <MLayoutUser>{children}</MLayoutUser>;
}
