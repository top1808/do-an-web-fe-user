'use client';
import React, { useEffect } from 'react';
import CarouselBanner from './components/CarouselBanner';
import Banner from './components/Banner';
import ListProducts from './components/ListProducts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingProduct } from '@/redux/reducers/productReducer';
import SideBarUser from '@/layout/SidebarUser';
import MRow from '@/components/MRow';
import MCol from '@/components/MCol';
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
			<Banner />
			<ListProducts listProducts={product.data ? product.data : []} />
			<MRow className='w-full mt-4'>
				<MCol span={6}>
					<MTitle level={3}>Danh mục</MTitle>
					<div className='p-2 rounded-xl w-full shadow-2xl '>
						<SideBarUser />
					</div>
				</MCol>
				<MCol span={18}></MCol>
			</MRow>
		</div>
	);
};

export default HomeUserComponent;
