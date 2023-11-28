import ProfileUserComponent from '@/features/profile/Index';
import InforUser from '@/features/profile/components/InforUser';
import { Metadata } from 'next';
import React from 'react';
import homeIcon from '../../../../public/icons/icons8-home-48.png';
export const metadata: Metadata = {
	title: 'Profile',
	description: 'Profile page',
	icons: [
		{
			rel: 'icon',
			url: homeIcon.src,
		},
	],
};
const Profile = () => {
	return (
		<ProfileUserComponent>
			<InforUser />
		</ProfileUserComponent>
	);
};

export default Profile;
