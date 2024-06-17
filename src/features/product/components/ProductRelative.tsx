import MSkeleton from '@/components/MSkeleton';
import MText from '@/components/MText';
import CustomSlider from '@/components/CustomSlider';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getProductState, gettingProducstRelative } from '@/redux/reducers/productReducer';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import CardProduct from '@/features/home/components/CardProduct';

interface ProductRelativeProps {}

const ProductRelative = (props: ProductRelativeProps) => {
	const product = useAppSelector(getProductState);
	const dispatch = useAppDispatch();
	const params = useParams();

	useEffect(() => {
		const slugs = (params.id as string)?.split('-');
		const id = slugs[slugs.length - 1];

		dispatch(gettingProducstRelative(id as string));
	}, [dispatch, params.id]);
	return (
		<MSkeleton loading={product.loading}>
			<div className='shadow-md mt-6 p-4 bg-white'>
				<MText
					className='text-xl font-bold'
					style={{ color: 'red' }}
				>
					Sản phẩm liên quan
				</MText>
				<CustomSlider
					length={product.productsRelative?.length || 0}
					dot={false}
				>
					{product.productsRelative.map((item) => (
						<CardProduct
							data={item}
							key={item._id}
						/>
					))}
				</CustomSlider>
			</div>
		</MSkeleton>
	);
};

export default ProductRelative;
