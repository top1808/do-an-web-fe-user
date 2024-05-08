import MImage from '@/components/MImage';
import MText from '@/components/MText';
import { Product } from '@/models/productModels';
import { customMoney, getProductPrice } from '@/utils/FunctionHelpers';
import { Rate } from 'antd';
import Link from 'next/link';
import React from 'react';
export interface CardProductProps {
	data: Product;
	isSale?: boolean;
	link?: string;
	isTop?: boolean;
}
const CardProduct: React.FC<CardProductProps> = ({ data, isSale, link, isTop }) => {
	return (
		<Link
			href={link || `/product/${data._id}`}
			className='block max-w-xs relative '
		>
			<div className='shadow-md px-1 py-4 bg-white border-blue-100 w-full card hover:opacity-70'>
				<div className='flex justify-center items-center'>
					<MImage
						src={data.image ? data.image : data?.images?.[0]}
						alt={data.name}
						preview={false}
						style={{ height: '12rem' }}
					/>
				</div>
				<div style={{ height: '3rem' }}>
					<MText className='text-base text-ellipsis-2 text-start'>{data.name}</MText>
				</div>
				<div className='my-1'>
					<p className={`text-start text-ellipsis-1 text-sm   ${isSale ? 'line-through' : 'text-red-500 '}`}>{getProductPrice(data)}</p>
				</div>
				{isSale && (
					<>
						<div style={{ height: '1.6rem' }}>
							<p className='text-start font-bold text-red-500'>{customMoney(data.promotionPrice)}</p>
						</div>
						<div className='absolute top-1 right-0 px-2 py-1 bg-red-500 rounded'>
							<p className='font-bold text-xs text-white'>{`- ${data.type === 'percent' ? data.value + '%' : customMoney(data.value)}`}</p>
						</div>
					</>
				)}
				{isTop && (
					<>
						<div className='absolute top-1 right-0 px-2 py-1 bg-red-400 rounded'>
							<p className='font-bold text-xs text-white'>{`TOP`}</p>
						</div>
					</>
				)}
				<div className='my-1'>
					<p className='text-start font-bold text-sm'>{`Đã bán: ${data.soldQuantityOfProduct || 0}`}</p>
				</div>
				<div>
					<Rate
						allowHalf
						className='text-sm'
						disabled
						defaultValue={(data?.rate || 0) > 0 ? data.rate : 5}
					/>
					<span className='text-base pl-2'>{`(${data.reviews?.length || 0})`}</span>
				</div>
			</div>
		</Link>
	);
};

export default CardProduct;
