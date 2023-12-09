'use client';
import React from 'react';
import SideBarProfile from './components/SideBarProfile';
import MRow from '@/components/MRow';
import MCol from '@/components/MCol';
import MCard from '@/components/MCard';

const ProfileUserComponent = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='w-full py-4'>
			<MRow gutter={12}>
				<MCol span={4}>
					<SideBarProfile />
				</MCol>
				<MCol span={20}>
					<MCard>
						<div className='w-full'>{children}</div>
					</MCard>
				</MCol>
			</MRow>
		</div>
	);
};

export default ProfileUserComponent;
