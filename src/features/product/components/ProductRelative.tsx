import MSkeleton from '@/components/MSkeleton';
import MText from '@/components/MText';
import SliderProducts from '@/components/SliderProducts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingProducstRelative } from '@/redux/reducers/productReducer';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

interface ProductRelativeProps {}

const ProductRelative = (props: ProductRelativeProps) => {
	const { product } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const params = useParams();

	useEffect(() => {
		dispatch(gettingProducstRelative(params.id as string));
	}, [dispatch, params.id]);
	return (
		<MSkeleton loading={product.loading}>
			<div className='shadow-md mt-6 p-4'>
				<MText
					className='text-xl font-bold'
					style={{ color: 'red' }}
				>
					Sản phẩm liên quan
				</MText>
				<SliderProducts data={product.productsRelative || []} />
				{/* <MRow
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
				</MRow> */}
			</div>
		</MSkeleton>
	);
};

export default ProductRelative;
