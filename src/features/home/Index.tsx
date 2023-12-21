'use client';
import React, { useEffect } from 'react';
import ListProducts from './components/ListProducts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingProduct } from '@/redux/reducers/productReducer';
import CarouselBanner from './components/CarouselBanner';
import MSkeleton from '@/components/MSkeleton';
import TrendingCategories from '../components/TrendingCategories';
import SliderProducts from './components/SliderProducts';
const HomeUserComponent = () => {
	const { product } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(gettingProduct());
	}, [dispatch]);
	return (
		<div className='w-full'>
			<CarouselBanner />
			<TrendingCategories />
			<SliderProducts data={product.data ? product.data : []} />
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
