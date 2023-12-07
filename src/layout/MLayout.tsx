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
				<Suspense
					fallback={
						<div className='flex items-center justify-center absolute top-0 left-0 bottom-0 right-0'>
							<MSpin size='large'></MSpin>
						</div>
					}
				>
					{children}
				</Suspense>
			</div>
			<Footer />
			<FloatButton.BackTop type='primary' />
		</div>
	);
};

export default MLayoutUser;
