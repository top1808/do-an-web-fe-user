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
import { getModalState, toggleChat } from '@/redux/reducers/modalReducer';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getAuthState } from '@/redux/reducers/authReducer';

interface LayoutProps {
	children?: React.ReactNode;
}

const MLayoutUser: React.FC<LayoutProps> = ({ children }) => {
	const auth = useAppSelector(getAuthState);
	const modal = useAppSelector(getModalState);

	const dispatch = useAppDispatch();

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
			<div
				style={{ backgroundColor: '#F5F5FA' }}
				className='max-w-[1200px] w-full mx-auto pb-8 min-h-screen'
			>
				{children}

				<MChatComponent />
			</div>
			<Footer />
			{!modal.isOpenChat && (
				<FloatButton
					shape='circle'
					type='primary'
					icon={<FontAwesomeIcon icon={faMessage} />}
					style={{ width: 60, height: 60, right: 94 }}
					onClick={() => dispatch(toggleChat())}
				/>
			)}
			<FloatButton.BackTop type='primary' />
		</main>
	);
};

export default MLayoutUser;
