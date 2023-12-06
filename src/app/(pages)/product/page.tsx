import { fetchServer } from '@/api/fetchServer';
import ProductsComponent from '@/features/product/Index';
import { Product } from '@/models/productModels';
import React from 'react';

async function getProductByCategory(id: string) {
	const res = await fetchServer('product/get-by-category/' + id);
	const response = await res.json();
	return response.products;
}

const ProductPage = async ({ params, searchParams }: { params: null; searchParams: { category: string } }) => {
	const products: Product[] = await getProductByCategory(searchParams.category);

	return <ProductsComponent products={products} />;
};

export default ProductPage;
