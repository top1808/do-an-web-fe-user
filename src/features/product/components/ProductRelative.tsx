import MSkeleton from '@/components/MSkeleton';
import MText from '@/components/MText';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getProductState, gettingProducstRelative } from '@/redux/reducers/productReducer';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import CardProduct from '@/features/home/components/CardProduct';
import MRow from '@/components/MRow';
import MCol from '@/components/MCol';

interface ProductRelativeProps {
	title: string;
}

const ProductRelative = ({ title }: ProductRelativeProps) => {
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
					{title}
				</MText>
				{/* <CustomSlider
					length={product.productsRelative?.length || 0}
					dot={false}
				>
					{product.productsRelative.map((item) => (
						<div key={item._id}>
							<CardProduct data={item} />
						</div>
					))}
				</CustomSlider> */}
				<MRow gutter={[16, 16]}>
					{product.productsRelative.map((item) => (
						<MCol
							xs={12}
							xl={4}
							key={item._id}
						>
							<CardProduct data={item} />
						</MCol>
					))}
				</MRow>
			</div>
		</MSkeleton>
	);
};

export default ProductRelative;
