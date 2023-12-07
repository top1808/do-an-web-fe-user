'use client';
import MButton from '@/components/MButton';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
	const { data: session } = useSession();

	useEffect(() => {
		if (session) {
			redirect('/');
		}
	}, [session]);

	return (
		<div className='h-screen w-screen overflow-hidden layout-login relative'>
			<div className='absolute top-6 left-6'>
				<MButton
					link='/'
					type='link'
					className='text-black font-bold'
				>
					<FontAwesomeIcon icon={faChevronLeft} />
					&nbsp; Back Home
				</MButton>
			</div>
			<div className='flex justify-center items-center h-full	'>{children}</div>
		</div>
	);
};

export default LoginLayout;
