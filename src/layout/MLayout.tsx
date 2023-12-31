'use client';
import React, { Suspense } from 'react';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import { FloatButton } from 'antd';
import MSpin from '@/components/MSpin';
interface LayoutProps {
	children?: React.ReactNode;
}

const MLayoutUser: React.FC<LayoutProps> = ({ children }) => {
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
