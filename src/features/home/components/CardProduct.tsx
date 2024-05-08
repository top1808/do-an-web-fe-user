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
				<div style={{ height: '2.4rem' }}>
					<p className={`text-start text-ellipsis-1 text-sm ${data.discounts ? 'line-through' : 'text-red-500'}   ${isSale && 'hidden'}`}>{getProductPrice(data)}</p>
					<p className={`text-start text-ellipsis-1 text-sm text-red-500`}>{` ${
						!isSale && data.discounts ? `${customMoney(data?.minPromotionPrice)} - ${customMoney(data?.maxPromotionPrice)}` : ' '
					}`}</p>
				</div>
				{isSale && (
					<>
						<div style={{ height: '1.6rem' }}>
							<p className='text-start text-ellipsis-1 text-sm line-through'>{customMoney(data.price)}</p>
						</div>
						<div style={{ height: '1.6rem' }}>
							<p className='text-start font-bold text-red-500'>{customMoney(data.promotionPrice)}</p>
						</div>
						<div className='absolute top-1 right-0 p-0 bg-red-500'>
							<p className='font-bold text-white'>{`- ${data.type === 'percent' ? data.value + '%' : customMoney(data.value)}`}</p>
						</div>
					</>
				)}
				{isTop && (
					<>
						<div className='absolute top-1 left-0 p-1 bg-red-400 text-xs/[0.75rem]'>
							<p className='font-bold text-white'>{`TOP`}</p>
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
