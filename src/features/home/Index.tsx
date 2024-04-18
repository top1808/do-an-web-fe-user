'use client';
import React, { useEffect } from 'react';
import ListProducts from './components/ListProducts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingProduct, productState } from '@/redux/reducers/productReducer';
import CarouselBanner from './components/CarouselBanner';
import MSkeleton from '@/components/MSkeleton';
import MTitle from '@/components/MTitle';
import { discountProgramState, gettingDiscountPrograms } from '@/redux/reducers/discountProgramReducer';
import ListCategories from '../components/ListCategories';
import { categoryState, gettingCategory } from '@/redux/reducers/categoryReducer';
import CustomSlider from '../../components/CustomSlider';
import CardProduct from './components/CardProduct';

import CountdownTimer from '@/components/CountdownTimer';
import { useTranslations } from 'next-intl';
const HomeUserComponent = () => {
	const category = useAppSelector(categoryState);
	const discountProgram = useAppSelector(discountProgramState);
	const product = useAppSelector(productState);
	const dispatch = useAppDispatch();
	const t = useTranslations('HomePage');

	useEffect(() => {
		dispatch(gettingProduct());
		dispatch(gettingCategory());
		dispatch(gettingDiscountPrograms());
	}, [dispatch]);
	return (
		<div className='w-full'>
			<CarouselBanner />
			<ListCategories
				categories={category.data ? category.data : null}
				title={t('Category')}
			/>
			<MSkeleton loading={discountProgram.loading}>
				{discountProgram?.data &&
					discountProgram?.data?.map((program) => (
						<div
							key={program._id}
							className='py-4'
						>
							<CountdownTimer
								endTime={program.dateEnd as string}
								startTime={program.dateStart as string}
							>
								<MTitle
									level={3}
									underline
								>
									{program.name}
								</MTitle>
								{program.products && program.products.length > 0 && (
									<CustomSlider length={program.products.length}>
										{program.products.map((item) => (
											<CardProduct
												data={item}
												key={item._id}
												isSale={true}
												link={`/product/${item.productCode!}?barcode=${item.productSKUBarcode}`}
											/>
										))}
									</CustomSlider>
								)}
							</CountdownTimer>
						</div>
					))}
			</MSkeleton>
			<MSkeleton loading={product.loading}>
				<ListProducts
					listProducts={product.data ? product.data : []}
					title={t('Product')}
					buttonName={t('ButtonContinue')}
				/>
			</MSkeleton>
		</div>
	);
};

export default HomeUserComponent;
