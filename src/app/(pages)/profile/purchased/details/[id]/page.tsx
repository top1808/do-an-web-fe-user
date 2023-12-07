import { Metadata } from 'next';
import React from 'react';
import homeIcon from '../../../../../public/icons/icons8-home-48.png';
import PurchasedDetailsPage from '@/features/profile/purchased/details/Index';

export const metadata: Metadata = {
	title: 'Order detail',
	icons: [
		{
			rel: 'icon',
			url: homeIcon.src,
		},
	],
};
const PurchasedPage = () => {
	return <PurchasedDetailsPage />;
};

export default PurchasedPage;
