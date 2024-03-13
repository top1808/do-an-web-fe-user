import MImage from '@/components/MImage';
import MText from '@/components/MText';
import { Product } from '@/models/productModels';
import { getProductPrice } from '@/utils/FunctionHelpers';
import Link from 'next/link';
import React from 'react';
export interface CardProductProps {
	data: Product;
}
const CardProduct: React.FC<CardProductProps> = ({ data }) => {
	return (
		<Link
			href={`/product/${data._id}`}
			className='block p-2'
		>
			<div className='shadow-md p-2 bg-white border-blue-100 w-full card hover:opacity-70'>
				<div className='flex justify-center items-center'>
					<MImage
						src={data.image ? data.image : data?.images?.[0]}
						alt={data.name}
						preview={false}
						style={{ height: '12rem' }}
					/>
				</div>
				<div style={{ height: '3rem' }}>
					<MText className='text-base text-ellipsis-2'>{data.name}</MText>
				</div>
				<div
					style={{ height: '1.6rem' }}
					className='text-ellipsis-1 text-base text-red-500 mt-2'
				>
					{getProductPrice(data)}
				</div>
			</div>
		</Link>
	);
};

export default CardProduct;
