import ProfileUserComponent from '@/features/profile/Index';
import InforUser from '@/features/profile/components/InforUser';
import React from 'react';

const Profile = () => {
	return (
		<ProfileUserComponent>
			<InforUser />
		</ProfileUserComponent>
	);
};

export default Profile;
