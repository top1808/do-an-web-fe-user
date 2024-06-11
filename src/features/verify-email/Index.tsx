'use client';
import MSpin from '@/components/MSpin';
import useCheckToken from '@/hooks/useCheckToken';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const VerifyEmail = () => {
	const params = useSearchParams();
	const token = params.get('token');
	useCheckToken(token || '');

	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<h2 className='mb-4'>Đang xác thực tài khoản email. Vui lòng đợi 1 vài phút.</h2>
			<MSpin size='large'></MSpin>
		</div>
	);
};

export default VerifyEmail;
