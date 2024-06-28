import { fetchServer } from '@/api/fetchServer';
import ProductsComponent from '@/features/product/Index';
import { Product, ProductParams, ReponseGetProductsByCategory } from '@/models/productModels';
import { objectToQueryString } from '@/utils/FunctionHelpers';
import React from 'react';

async function getProductByCategory(searchParams: { category: string; offset: string; limit: string; rate: string; minPrice: number; maxPrice: number; sortBy: string; sortType: string }) {
	const query = objectToQueryString<ProductParams>({
		offset: searchParams.offset ?? '',
		limit: searchParams.limit ?? '',
		rate: searchParams.rate ?? '',
		maxPrice: searchParams.maxPrice ?? '',
		minPrice: searchParams.minPrice ?? '',
		sortBy: searchParams.sortBy ?? '',
		sortType: searchParams.sortType ?? '',
	});
	const res = await fetchServer(`product/get-by-category/${searchParams.category ?? 'all'}` + query);
	const response = await res.json();
	return response as ReponseGetProductsByCategory;
}
export async function generateMetadata({
	params,
	searchParams,
}: {
	params: null;
	searchParams: { category: string; offset: string; limit: string; rate: string; minPrice: number; maxPrice: number; sortBy: string; sortType: string };
}) {
	return {
		title: ` ${searchParams.category ?? 'all'}`,
	};
}
const ProductPage = async ({
	params,
	searchParams,
}: {
	params: null;
	searchParams: { category: string; offset: string; limit: string; rate: string; minPrice: number; maxPrice: number; sortBy: string; sortType: string };
}) => {
	const { products, pagination }: ReponseGetProductsByCategory = await getProductByCategory(searchParams);

	return (
		<ProductsComponent
			products={products as Product[]}
			pagination={pagination}
		/>
	);
};

export default ProductPage;
