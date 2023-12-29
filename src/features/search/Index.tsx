'use client';

import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { searchingProducts } from '@/redux/reducers/productReducer';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import CardProduct from '../home/components/CardProduct';
import MSkeleton from '@/components/MSkeleton';
import MText from '@/components/MText';

interface SearchPageComponentProps {}

const SearchPageComponent = (props: SearchPageComponentProps) => {
	const { product } = useAppSelector((state) => state);
	const { productsSearch } = product;

	const dispatch = useAppDispatch();
	const params = useSearchParams();

	useEffect(() => {
		dispatch(searchingProducts(params.get('search') || ''));
	}, [dispatch, params]);

	return (
		<MSkeleton loading={product.isSearching}>
			<div className='py-2'>
				<MText className='text-base font-bold'>Từ khóa tìm kiếm: {params.get('search')}.</MText> &nbsp;
				<MText className='text-base font-bold'>Tìm thấy {productsSearch.length} sản phẩm</MText>
			</div>
			<MRow gutter={[12, 12]}>
				{productsSearch &&
					productsSearch?.length > 0 &&
					productsSearch.map((product, index) => {
						return (
							<MCol
								key={index}
								xs={24}
								sm={12}
								md={8}
								lg={6}
								xl={4}
							>
								<CardProduct data={product} />
							</MCol>
						);
					})}
			</MRow>
		</MSkeleton>
	);
};

export default SearchPageComponent;
