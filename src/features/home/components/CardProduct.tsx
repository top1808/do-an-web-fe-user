import MImage from '@/components/MImage';
import MText from '@/components/MText';
import { Product } from '@/models/productModels';
import { customMoney, getProductPrice, getProductPromotionPrice } from '@/utils/FunctionHelpers';
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
			className='block max-w-xs relative'
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
				{!isSale && (
					<div
						className='flex flex-col justify-end'
						style={{ height: '2.4rem' }}
					>
						<p className={`text-start text-ellipsis-1 text-base ${data.discounts ? 'line-through text-gray-500 font-semibold text-sm' : 'text-red-500 font-bold'}   ${isSale && 'hidden'}`}>
							{getProductPrice(data)}
						</p>
						<p className={`text-start text-ellipsis-1 text-base font-bold text-red-500`}>{getProductPromotionPrice(data)}</p>
					</div>
				)}
				{isSale && (
					<div
						className='flex flex-col justify-end my-2'
						style={{ height: '2.4rem' }}
					>
						<div>
							<p className='text-start text-ellipsis-1 line-through text-gray-500 font-semibold text-sm'>{customMoney(data.price)}</p>
						</div>
						<div>
							<p className='text-start font-bold text-base text-red-500'>{customMoney(data.promotionPrice)}</p>
						</div>
						<div className='absolute top-1 right-0 px-2 py-1 bg-red-500 rounded'>
							<p className='font-bold text-xs text-white'>{`- ${data.type === 'percent' ? data.value + '%' : customMoney(data.value)}`}</p>
						</div>
					</div>
				)}
				{isTop && (
					<>
						<div className='absolute top-1 right-0 px-2 py-1 bg-red-400 rounded'>
							<p className='font-bold text-xs text-white'>{`TOP`}</p>
						</div>
					</>
				)}
				{data.discounts && (
					<div className='absolute top-1 right-0 p-1 bg-red-400 text-xs/[0.75rem]'>
						<p className='font-bold text-white'>{`Sale`}</p>
					</div>
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
					<span className='text-base pl-2'>{`(${data.totalReviews || 0})`}</span>
				</div>
			</div>
		</Link>
	);
};

export default CardProduct;
