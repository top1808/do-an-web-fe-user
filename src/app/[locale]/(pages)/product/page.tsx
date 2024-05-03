import { fetchServer } from '@/api/fetchServer';
import ProductsComponent from '@/features/product/Index';
import { ProductParams, ReponseGetProductsByCategory } from '@/models/productModel';
import { Product } from '@/models/productModels';
import { objectToQueryString } from '@/utils/FunctionHelpers';
import React from 'react';

async function getProductByCategory(searchParams: { category: string; offset: string; limit: string }) {
	const query = objectToQueryString<ProductParams>({ offset: searchParams.offset, limit: searchParams.limit });
	const res = await fetchServer('product/get-by-category/' + searchParams.category + query);
	const response = await res.json();
	return response as ReponseGetProductsByCategory;
}

const ProductPage = async ({ params, searchParams }: { params: null; searchParams: { category: string; offset: string; limit: string } }) => {
	const { products, pagination }: ReponseGetProductsByCategory = await getProductByCategory(searchParams);
	return (
		<ProductsComponent
			products={products as Product[]}
			pagination={pagination}
		/>
	);
};

export default ProductPage;
