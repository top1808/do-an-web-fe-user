'use client';
import UserLogin from '@/features/login/Index';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const UserLoginPage = () => {
	const { auth } = useAppSelector((state) => state);
	const router = useRouter();
	useEffect(() => {
		if (auth.isLoggedIn) {
			router.push('/home');
		}
	}, [auth, router]);
	return <UserLogin />;
};

export default UserLoginPage;
