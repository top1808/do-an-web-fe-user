'use client';
import React, { useEffect } from 'react';
import CardProduct from './CardProduct';
import MRow from '@/components/MRow';
import MCol from '@/components/MCol';
import MButton from '@/components/MButton';
import Link from 'next/link';
import MSkeleton from '@/components/MSkeleton';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getProductState, gettingProduct } from '@/redux/reducers/productReducer';

const ListProducts = () => {
	const product = useAppSelector(getProductState);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(gettingProduct());
	}, [dispatch]);
	return (
		<MSkeleton loading={product.loading}>
			<div className='bg-white p-2'>
				<div className='flex justify-center h-14 items-center'>
					<h3 className='h-full text-center leading-10 py-4 font-semibold text-red-400 '>{'All Product'}</h3>
				</div>
				<MRow
					gutter={[
						{ xs: 2, sm: 12, xl: 16 },
						{ xs: 2, sm: 12, xl: 16 },
					]}
				>
					{product.data &&
						product.data?.length > 0 &&
						product.data.map((product, index) => {
							return (
								<MCol
									key={index}
									xs={12}
									md={8}
									xl={4}
								>
									<CardProduct data={product} />
								</MCol>
							);
						})}
				</MRow>
				<div className='w-full flex justify-center mt-6'>
					<Link href='/product?category=all'>
						<MButton>{'See more'}</MButton>
					</Link>
				</div>
			</div>
		</MSkeleton>
	);
};

export default ListProducts;
