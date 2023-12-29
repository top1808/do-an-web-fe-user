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
import { gettingDiscountPrograms } from '@/redux/reducers/discountProgramReducer';
const HomeUserComponent = () => {
	const { product, discountProgram } = useAppSelector((state) => state);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(gettingProduct());
		dispatch(gettingDiscountPrograms());
	}, [dispatch]);

	return (
		<div className='w-full'>
			<CarouselBanner />
			<TrendingCategories />
			<MSkeleton loading={discountProgram.loading}>
				{discountProgram?.data &&
					discountProgram?.data?.map((program) => (
						<div key={program._id}>
							<MTitle
								level={3}
								className='p-2'
							>
								{program.name}
							</MTitle>
							<SliderProducts data={program.products || []} />
						</div>
					))}
			</MSkeleton>

			<MSkeleton loading={product.loading}>
				<div>
					<MTitle
						level={3}
						className='p-2'
					>
						Xu hướng
					</MTitle>
					<SliderProducts data={product.data || []} />
				</div>

				<ListProducts listProducts={product.data ? product.data : []} />
			</MSkeleton>
		</div>
	);
};

export default HomeUserComponent;
