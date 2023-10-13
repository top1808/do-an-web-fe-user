import Loading from '@/components/Loading';
import HomeUserComponent from '@/features/home/Index';
import dynamic from 'next/dynamic';
import React from 'react';

const MLayoutUser = dynamic(() => import('@/layout/MLayout'), {
	loading: () => <Loading />,
});

const Home = () => {
	return (
		<MLayoutUser>
			<HomeUserComponent />
		</MLayoutUser>
	);
};

export default Home;
