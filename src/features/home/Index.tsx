'use client';
import React, { useEffect } from 'react';
import Banner from './components/Banner';
import ListProducts from './components/ListProducts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingProduct } from '@/redux/reducers/productReducer';
import SideBarUser from '@/layout/SidebarUser';
import MRow from '@/components/MRow';
import MCol from '@/components/MCol';
import MTitle from '@/components/MTitle';
import CarouselBanner from './components/CarouselBanner';
import MSkeleton from '@/components/MSkeleton';

const HomeUserComponent = () => {
	const { product } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(gettingProduct());
	}, [dispatch]);
	return (
		<div className='w-full'>
			<CarouselBanner />
			<MSkeleton
				loading={product.loading}
				className='p-2'
			>
				<ListProducts listProducts={product.data ? product.data : []} />
			</MSkeleton>
		</div>
	);
};

export default HomeUserComponent;
