import { Metadata } from 'next';
import React from 'react';
import homeIcon from '../../../../../public/icons/icons8-home-48.png';
import Notice from '@/features/profile/notification/Index';

export const metadata: Metadata = {
	title: 'Notification',
	icons: [
		{
			rel: 'icon',
			url: homeIcon.src,
		},
	],
};
const NotificationPage = () => {
	return <Notice />;
};

export default NotificationPage;
