'use client';
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import { FloatButton } from 'antd';
import { registerServiceWorker, requestPermission } from '@/lib/firebase';
interface LayoutProps {
	children?: React.ReactNode;
}

const MLayoutUser: React.FC<LayoutProps> = ({ children }) => {
	useEffect(() => {
		registerServiceWorker();
		requestPermission();
	}, []);
	return (
		<div className='w-full '>
			<div className='sticky top-0 z-10'>
				<Header />
				<Menu />
			</div>

			<div
				style={{ backgroundColor: '#F5F5FA' }}
				className='px-32 pb-8 min-h-screen'
			>
				{children}
			</div>
			<Footer />
			<FloatButton.BackTop type='primary' />
		</div>
	);
};

export default MLayoutUser;
