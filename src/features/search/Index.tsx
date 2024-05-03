'use client';

import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getProductState, searchingProducts } from '@/redux/reducers/productReducer';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import CardProduct from '../home/components/CardProduct';
import MSkeleton from '@/components/MSkeleton';
import MText from '@/components/MText';
import SearchFilter from '@/components/SearchFilter';

interface SearchPageComponentProps {}

const SearchPageComponent = (props: SearchPageComponentProps) => {
	const product = useAppSelector(getProductState);
	const { productsSearch } = product;
	const dispatch = useAppDispatch();
	const params = useSearchParams();
	useEffect(() => {
		dispatch(searchingProducts(params.get('search') || ''));
	}, [dispatch, params]);

	return (
		<MSkeleton loading={product.isSearching}>
			<div className='py-4 px-2'>
				<MText className='text-xl font-bold'>Từ khóa tìm kiếm: {params.get('search')}.</MText> &nbsp;
				<MText className='text-xl font-bold'>Tìm thấy {productsSearch.length} sản phẩm</MText>
			</div>
			<MRow>
				<MCol
					xs={24}
					sm={24}
					md={24}
					lg={8}
					xl={6}
				>
					<SearchFilter />
				</MCol>
				<MCol
					xs={24}
					sm={24}
					md={24}
					lg={16}
					xl={18}
				>
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
				</MCol>
			</MRow>
		</MSkeleton>
	);
};

export default SearchPageComponent;
