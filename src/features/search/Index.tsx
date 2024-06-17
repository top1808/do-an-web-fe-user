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
import { ProductFilterParams } from '@/models/productModels';

const SearchPageComponent = () => {
	const product = useAppSelector(getProductState);
	const { productsSearch } = product;
	const seachParams = useSearchParams();
	const dispatch = useAppDispatch();
	useEffect(() => {
		const params: ProductFilterParams = {
			search: seachParams.get('search') || '',
			sortBy: seachParams.get('sortBy') || '',
			sortType: seachParams.get('sortType') || '',
			rate: seachParams.get('rate') || '',
			minPrice: Number(seachParams.get('minPrice') || 0),
			maxPrice: Number(seachParams.get('maxPrice') || 0),
		};
		dispatch(searchingProducts(params));
	}, [dispatch, seachParams]);

	return (
		<MSkeleton loading={product.isSearching}>
			<MRow
				className='mt-4'
				gutter={[16, 16]}
			>
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
					<div className='py-4 px-2'>
						<MText className='text-xl font-bold'>Từ khóa tìm kiếm: {seachParams.get('search')}.</MText> &nbsp;
						<MText className='text-xl font-bold'>Tìm thấy {productsSearch.length} sản phẩm</MText>
					</div>
					<MRow gutter={[12, 12]}>
						{productsSearch.length > 0 &&
							productsSearch.map((product) => {
								return (
									<MCol
										key={product._id}
										xs={12}
										md={8}
										lg={6}
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
