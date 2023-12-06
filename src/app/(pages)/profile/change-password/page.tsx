import { Metadata } from 'next';
import React from 'react';
import homeIcon from '../../../../../public/icons/icons8-home-48.png';
import ChangePass from '@/features/profile/change-password/Index';

export const metadata: Metadata = {
	title: 'Change Password',
	icons: [
		{
			rel: 'icon',
			url: homeIcon.src,
		},
	],
};
const ChangePasswordPage = () => {
	return <ChangePass />;
};

export default ChangePasswordPage;
