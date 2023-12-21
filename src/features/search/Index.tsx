'use client';

import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { searchingProducts } from '@/redux/reducers/productReducer';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import CardProduct from '../home/components/CardProduct';
import MTitle from '@/components/MTitle';
import MSkeleton from '@/components/MSkeleton';

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
			<MRow gutter={[12, 12]}>
				{productsSearch &&
					productsSearch?.length > 0 &&
					productsSearch.map((product, index) => {
						return (
							<MCol
								key={index}
								xs={12}
								sm={12}
								md={12}
								lg={8}
								xl={6}
							>
								<CardProduct data={product} />
							</MCol>
						);
					})}

				{(!productsSearch || productsSearch?.length <= 0) && (
					<MTitle
						className='pl-2'
						level={3}
					>
						Không tìm thấy sản phẩm phù hợp !
					</MTitle>
				)}
			</MRow>
		</MSkeleton>
	);
};

export default SearchPageComponent;
