import HomeUserComponent from '@/features/home/Index';
import MLayoutUser from '@/layout/MLayout';
import { Metadata } from 'next';
import React from 'react';
import homeIcon from '../../public/icons/icons8-home-48.png';
export const metadata: Metadata = {
	title: 'Home',
	description: 'Home page',
	icons: [
		{
			rel: 'icon',
			url: homeIcon.src,
		},
	],
};
const Home = () => {
	return (
		<MLayoutUser>
			<HomeUserComponent />
		</MLayoutUser>
	);
};

export default Home;
