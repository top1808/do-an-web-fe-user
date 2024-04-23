import { Metadata } from 'next';
import React from 'react';
import homeIcon from '../../../../../../public/icons/icons8-home-48.png';

import PurchasedComponent from '@/features/profile/purchased/Index';

export const metadata: Metadata = {
	title: 'Order',
	icons: [
		{
			rel: 'icon',
			url: homeIcon.src,
		},
	],
};

const PurchasedPage = () => {
	return <PurchasedComponent />;
};

export default PurchasedPage;
