import HomeUserComponent from '@/features/home/Index';
import MLayoutUser from '@/layout/user/MLayout';
import React from 'react';

const Home = () => {
	return (
		<MLayoutUser>
			<HomeUserComponent />
		</MLayoutUser>
	);
};

export default Home;
