'use client';
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { FloatButton } from 'antd';
import { registerServiceWorker, requestPermission } from '@/lib/firebase';
import { onGetPusherNotification } from '@/lib/pusher';
interface LayoutProps {
	children?: React.ReactNode;
}

const MLayoutUser: React.FC<LayoutProps> = ({ children }) => {
	useEffect(() => {
		registerServiceWorker();
		requestPermission();
		onGetPusherNotification();
	}, []);

	return (
		<div>
			<div className='sticky top-0 z-10'>
				<Header />
			</div>
			<div
				style={{ backgroundColor: '#F5F5FA' }}
				className='px-0 md:px-10 xl:px-32 pb-8 w-full'
			>
				{children}
			</div>
			<Footer />
			<FloatButton.BackTop type='primary' />
		</div>
	);
};

export default MLayoutUser;
