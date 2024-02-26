import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { changeMainImage } from '@/redux/reducers/productReducer';
import { Image } from 'antd';
import React from 'react';

interface ProductImageWrapProps {
	images: string[];
}

const ProductImageWrap = (props: ProductImageWrapProps) => {
	const { images } = props;

	const product = useAppSelector((state) => state.product);

	const dispatch = useAppDispatch();

	return (
		<div>
			<Image
				src={product?.mainImage || images[0]}
				alt={product?.mainImage || images[0]}
				width={'100%'}
			/>
			<div className='mt-2 flex gap-2 items-center'>
				{images?.map((image, index) => (
					<Image
						key={index}
						src={image}
						alt={image}
						width={80}
						onMouseEnter={() => dispatch(changeMainImage(image))}
						preview={false}
						className='hover:opacity-80 cursor-pointer'
					/>
				))}
			</div>
		</div>
	);
};

export default ProductImageWrap;
