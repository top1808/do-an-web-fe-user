import { fetchServer } from '@/api/fetchServer';
import SearchPageComponent from '@/features/search/Index';
import { ProductParams } from '@/models/productModels';
import { objectToQueryString } from '@/utils/FunctionHelpers';
import React from 'react';
async function getResultSearch(searchParams: { search: string; offset: string; limit: string; rate: string; minPrice: number; maxPrice: number; sortBy: string; sortType: string }) {
	const query = objectToQueryString<ProductParams>({
		offset: searchParams.offset ?? '',
		limit: searchParams.limit ?? '',
		rate: searchParams.rate ?? '',
		maxPrice: searchParams.maxPrice ?? '',
		minPrice: searchParams.minPrice ?? '',
		sortBy: searchParams.sortBy ?? '',
		sortType: searchParams.sortType ?? '',
	});
	if (searchParams.search) {
		const res = await fetchServer(`product/search/${searchParams.search}` + query);
		const response = await res.json();
		return response;
	} else {
		const res = await fetchServer('product/get-by-category/all' + query);
		const response = await res.json();
		return response;
	}
}
const SearchPage = async ({
	params,
	searchParams,
}: {
	params: any;
	searchParams: { search: string; offset: string; limit: string; rate: string; minPrice: number; maxPrice: number; sortBy: string; sortType: string };
}) => {
	const { products } = await getResultSearch(searchParams);
	return (
		<SearchPageComponent
			keySearch={searchParams.search}
			searchResults={products ?? []}
		/>
	);
};

export default SearchPage;
