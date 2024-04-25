import { fetchServer } from '@/api/fetchServer';
import DetailProductComponent from '@/features/product/[id]/Index';
import { Product } from '@/models/productModels';
import { Review } from '@/models/reviewModel';
import React from 'react';

async function getProductInfor(id: string) {
	const res = await fetchServer('product/' + id);
	const response = await res.json();
	return response.product;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
	const productInfor: Product = await getProductInfor(params.id);
	return {
		title: productInfor?.name,
	};
}
async function getReviews(id: string) {
	const res = await fetchServer('review/get-by-product/' + id, { method: 'GET' });
	const response = await res.json();
	return response.reviews;
}
const DetailProduct = async ({ params }: { params: { id: string } }) => {
	const productInfor: Product = await getProductInfor(params.id);
	const reviews: Review[] = await getReviews(params.id);
	return (
		<DetailProductComponent
			productInfor={productInfor}
			reviews={reviews}
		/>
	);
};

export default DetailProduct;
