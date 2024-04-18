'use client';
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { FloatButton } from 'antd';
import { registerServiceWorker, requestPermission } from '@/lib/firebase';
import { onGetPusherNotification } from '@/lib/pusher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import MChatComponent from '@/components/MChatComponent';
import { toggleChat } from '@/redux/reducers/modalReducer';
import { useAppDispatch } from '@/redux/hooks';
interface LayoutProps {
	children?: React.ReactNode;
}

const MLayoutUser: React.FC<LayoutProps> = ({ children }) => {
	const dispatch = useAppDispatch();
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
				className='px-0 md:px-10 xl:px-32 pb-8 w-full min-h-screen'
			>
				{children}
				<FloatButton
					shape='circle'
					type='primary'
					icon={<FontAwesomeIcon icon={faMessage} />}
					style={{ width: 60, height: 60 }}
					onClick={() => dispatch(toggleChat())}
				/>
				<MChatComponent />
			</div>
			<Footer />
			<FloatButton.BackTop type='primary' />
		</div>
	);
};

export default MLayoutUser;
