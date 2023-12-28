'use client';
import React, { useEffect } from 'react';
import ListProducts from './components/ListProducts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingProduct } from '@/redux/reducers/productReducer';
import CarouselBanner from './components/CarouselBanner';
import MSkeleton from '@/components/MSkeleton';
import TrendingCategories from '../components/TrendingCategories';
import SliderProducts from '../../components/SliderProducts';
import MTitle from '@/components/MTitle';
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

			<MSkeleton
				loading={product.loading}
				className='p-2'
			>
				<div>
					<MTitle
						level={3}
						className='p-2'
					>
						Xu hướng
					</MTitle>
					<SliderProducts data={product.data ? product.data : []} />
				</div>
				<ListProducts listProducts={product.data ? product.data : []} />
			</MSkeleton>
		</div>
	);
};

export default HomeUserComponent;
