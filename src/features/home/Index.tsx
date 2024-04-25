'use client';
import React, { useEffect } from 'react';
import ListProducts from './components/ListProducts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingProduct, getProductState } from '@/redux/reducers/productReducer';
import MSkeleton from '@/components/MSkeleton';
import MTitle from '@/components/MTitle';
import { discountProgramState, gettingDiscountPrograms } from '@/redux/reducers/discountProgramReducer';
import ListCategories from '../components/ListCategories';
import { getCategoryState, gettingCategory } from '@/redux/reducers/categoryReducer';
import CustomSlider from '../../components/CustomSlider';
import CardProduct from './components/CardProduct';
import CountdownTimer from '@/components/CountdownTimer';
import { useTranslations } from 'next-intl';
import MRow from '@/components/MRow';
import MCol from '@/components/MCol';
import Link from 'next/link';
import CarouselBanner from './components/CarouselBanner';
const HomeUserComponent = () => {
	const category = useAppSelector(getCategoryState);
	const discountProgram = useAppSelector(discountProgramState);
	const product = useAppSelector(getProductState);
	const dispatch = useAppDispatch();
	const t = useTranslations('HomePage');
	useEffect(() => {
		dispatch(gettingProduct());
		dispatch(gettingCategory());
		dispatch(gettingDiscountPrograms());
	}, [dispatch]);

	return (
		<div className='flex flex-col gap-4 mb-4'>
			<CarouselBanner />
			<ListCategories
				categories={category.data ? category.data : null}
				title={t('Category')}
			/>
			<MSkeleton loading={discountProgram.loading}>
				{discountProgram?.data ? (
					discountProgram?.data?.map((program) => (
						<div
							key={program._id}
							className='py-4 px-2 bg-white'
						>
							<CountdownTimer
								endTime={program.dateEnd as string}
								startTime={program.dateStart as string}
							>
								<div className='flex justify-between border-0 border-b-[1px] border-solid  border-gray-400'>
									<div>
										<MTitle
											level={3}
											underline
										>
											{program.name}
										</MTitle>
									</div>
									<div>
										<Link
											href={'/'}
											className='underline font-semibold text-orange-500'
										>
											See all
										</Link>
									</div>
								</div>
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
					))
				) : (
					<></>
				)}
			</MSkeleton>
			<MSkeleton loading={product.loading}>
				<div className='bg-white px-2'>
					<div className='flex justify-between h-14 items-center'>
						<h3 className='h-full text-center leading-10 py-4 font-semibold text-gray-600'>TOP PRODUCTS</h3>
						<div>
							<Link
								href={'/'}
								className='underline font-semibold text-orange-500'
							>
								See all
							</Link>
						</div>
					</div>
					<MRow
						gutter={[
							{ xs: 2, sm: 12, xl: 16 },
							{ xs: 2, sm: 12, xl: 16 },
						]}
					>
						{product.data?.map((product, index) => {
							return (
								<MCol
									key={index}
									xs={12}
									md={8}
									xl={4}
								>
									<CardProduct
										data={product}
										isTop={true}
									/>
								</MCol>
							);
						})}
					</MRow>
				</div>
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
