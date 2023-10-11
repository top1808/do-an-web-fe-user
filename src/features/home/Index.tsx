'use client';
import React, { useEffect } from 'react';
import CarouselBanner from './components/CarouselBanner';
import Banner from './components/Banner';
import ListProducts from './components/ListProducts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingProduct } from '@/redux/reducers/productReducer';

const HomeUserComponent = () => {
	const { product } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(gettingProduct());
	}, [dispatch]);
	return (
		<div>
			<CarouselBanner />
			<Banner />
			<ListProducts listProducts={product.data ? product.data : []} />
		</div>
	);
};

export default HomeUserComponent;
