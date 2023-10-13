import Loading from '@/components/Loading';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const MLayoutUser = dynamic(() => import('@/layout/MLayout'), {
	loading: () => <Loading />,
});

export const metadata: Metadata = {
	title: 'Login',
	description: 'Login admin',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return <MLayoutUser>{children}</MLayoutUser>;
}
