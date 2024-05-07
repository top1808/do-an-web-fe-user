'use client';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MSkeleton from '@/components/MSkeleton';
import Link from 'next/link';
import React, { useEffect } from 'react';
import CardProduct from './CardProduct';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getProductState, gettingProduct } from '@/redux/reducers/productReducer';

const ListProductTopSales = () => {
	const product = useAppSelector(getProductState);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(gettingProduct());
	}, [dispatch]);
	return (
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
	);
};

export default ListProductTopSales;
