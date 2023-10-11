import MButton from '@/components/MButton';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Login',
	description: 'Login website',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='h-screen w-screen overflow-hidden layout-login relative'>
			<div className='absolute top-6 left-6'>
				<MButton
					link='/'
					type='primary'
				>
					<FontAwesomeIcon
						color='white'
						icon={faChevronLeft}
					/>
					&nbsp; Back Home
				</MButton>
			</div>

			<div className='flex justify-center items-center h-full	'>{children}</div>
		</div>
	);
}
