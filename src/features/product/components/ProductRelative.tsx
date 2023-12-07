import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import CardProduct from '@/features/home/components/CardProduct';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingProducstRelative } from '@/redux/reducers/productReducer';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

interface ProductRelativeProps {}

const ProductRelative = (props: ProductRelativeProps) => {
	const { product } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const params = useParams();
	console.log('🚀 ~ file: ProductRelative.tsx:8 ~ ProductRelative ~ product:', product);

	useEffect(() => {
		dispatch(gettingProducstRelative(params.id as string));
	}, [dispatch, params.id]);
	return (
		<div className='shadow-xl mt-6 p-4'>
			<MText
				className='text-xl font-bold'
				style={{ color: 'red' }}
			>
				Sản phẩm liên quan
			</MText>
			<MRow
				gutter={8}
				className='p-4'
			>
				{product?.productsRelative?.map((product, index) => (
					<MCol
						key={index}
						xs={24}
						sm={12}
						md={6}
						lg={4}
						xl={4}
					>
						<CardProduct data={product} />
					</MCol>
				))}
			</MRow>
		</div>
	);
};

export default ProductRelative;
