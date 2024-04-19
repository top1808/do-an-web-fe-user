import MImage from '@/components/MImage';
import MText from '@/components/MText';
import { Product } from '@/models/productModels';
import { customMoney, getProductPrice } from '@/utils/FunctionHelpers';
import Link from 'next/link';
import React from 'react';
export interface CardProductProps {
	data: Product;
	isSale?: boolean;
	link?: string;
}
const CardProduct: React.FC<CardProductProps> = ({ data, isSale, link }) => {
	return (
		<Link
			href={link || `/product/${data._id}`}
			className='block max-w-xs relative '
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
					<MText className='text-base text-ellipsis-2 text-center'>{data.name}</MText>
				</div>
				<div
					style={{ height: '1.6rem' }}
					className={`text-ellipsis-1 text-base mt-2 text-center ${isSale ? 'line-through' : 'text-red-500 '}`}
				>
					{getProductPrice(data)}
				</div>
				{isSale && (
					<>
						<div style={{ height: '1.6rem' }}>
							<p className='text-center font-bold text-red-500'>{customMoney(data.promotionPrice)}</p>
						</div>
						<div className='absolute top-2 right-2'>
							<p className='font-bold text-red-500'>{`- ${data.value}%`}</p>
						</div>
					</>
				)}
			</div>
		</Link>
	);
};

export default CardProduct;
