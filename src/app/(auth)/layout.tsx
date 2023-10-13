import MSpin from '@/components/MSpin';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const LoginLayout = dynamic(() => import('@/layout/LoginLayout'), {
	loading: () => (
		<div className='w-screen h-screen flex items-center justify-center opacity-60'>
			<MSpin size='large'></MSpin>
		</div>
	),
});

export const metadata: Metadata = {
	title: 'Login',
	description: 'Login website',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return <LoginLayout> {children} </LoginLayout>;
}
