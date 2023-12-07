import { fetchServer } from '@/api/fetchServer';
import DetailProductComponent from '@/features/product/[id]/Index';
import { Product } from '@/models/productModels';
import React from 'react';

async function getProductInfor(id: string) {
	const res = await fetchServer('product/' + id);
	const response = await res.json();
	return response.product;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
	const productInfor: Product = await getProductInfor(params.id);

	return {
		title: productInfor.name,
	};
}

const DetailProduct = async ({ params }: { params: { id: string } }) => {
	const productInfor: Product = await getProductInfor(params.id);

	return <DetailProductComponent productInfor={productInfor} />;
};

export default DetailProduct;
