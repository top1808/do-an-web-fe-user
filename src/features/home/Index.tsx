'use client';
import React, { useEffect } from 'react';
import ListProducts from './components/ListProducts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingProduct } from '@/redux/reducers/productReducer';
import CarouselBanner from './components/CarouselBanner';
import MSkeleton from '@/components/MSkeleton';
import MTitle from '@/components/MTitle';
import { gettingDiscountPrograms } from '@/redux/reducers/discountProgramReducer';
import ListCategories from '../components/ListCategories';
import { gettingCategory } from '@/redux/reducers/categoryReducer';
import CustomSlider from '../../components/CustomSlider';
import CardProduct from './components/CardProduct';
const HomeUserComponent = () => {
	const { product, discountProgram, category } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(gettingProduct());
		dispatch(gettingCategory());
		dispatch(gettingDiscountPrograms());
	}, [dispatch]);
	return (
		<div className='w-full'>
			<CarouselBanner />
			<ListCategories categories={category.data ? category.data : null} />
			<MSkeleton loading={discountProgram.loading}>
				{discountProgram?.data &&
					discountProgram?.data?.map((program) => (
						<div
							key={program._id}
							className='py-4'
						>
							<MTitle level={3}>{program.name}</MTitle>
							{program.products && program.products.length > 0 && (
								<CustomSlider length={program.products.length}>
									{program.products.map((item) => (
										<CardProduct
											data={item}
											key={item._id}
										/>
									))}
								</CustomSlider>
							)}
						</div>
					))}
			</MSkeleton>
			<MSkeleton loading={product.loading}>
				<ListProducts listProducts={product.data ? product.data : []} />
			</MSkeleton>
		</div>
	);
};

export default HomeUserComponent;
