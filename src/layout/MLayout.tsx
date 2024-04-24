'use client';
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { FloatButton } from 'antd';
import { registerServiceWorker, requestPermission } from '@/lib/firebase';
import { onGetPusherNotification } from '@/lib/pusher';
import CarouselBanner from '@/features/home/components/CarouselBanner';
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
		<main style={{ backgroundColor: '#F5F5FA' }}>
			<div className='sticky top-0 z-10'>
				<Header />
			</div>
			<div className='bg-white px-0 md:px-10 xl:px-32 py-8'>
				<CarouselBanner />
			</div>
			<div className='px-0 md:px-10 xl:px-32 mt-4 w-full min-h-screen flex flex-col gap-4'>{children}</div>
			<Footer />
			<FloatButton.BackTop type='primary' />
		</main>
	);
};

export default MLayoutUser;
