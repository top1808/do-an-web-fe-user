import ProfileUserComponent from '@/features/profile/Index';
import InforUser from '@/features/profile/components/InforUser';
import React from 'react';

const Profile = () => {
	return (
		<ProfileUserComponent>
			<InforUser data={{ username: 'string', name: 'thang123', email: 'string@@', id: '123123', phone: '123123' }} />
		</ProfileUserComponent>
	);
};

export default Profile;
