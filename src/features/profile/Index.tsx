'use client';
import React from 'react';
import SideBarProfile from './components/SideBarProfile';
import MRow from '@/components/MRow';
import MCol from '@/components/MCol';
import MCard from '@/components/MCard';

const ProfileUserComponent = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='w-full py-4'>
			<MRow gutter={{ md: 10, xl: 12 }}>
				<MCol
					xs={24}
					md={6}
				>
					<SideBarProfile />
				</MCol>
				<MCol
					xs={24}
					md={18}
				>
					<MCard>
						<div className='w-full'>{children}</div>
					</MCard>
				</MCol>
			</MRow>
		</div>
	);
};

export default ProfileUserComponent;
