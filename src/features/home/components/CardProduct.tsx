import MButton from '@/components/MButton';
import MImage from '@/components/MImage';
import MText from '@/components/MText';
import { Product } from '@/models/productModels';
import { customMoney } from '@/utils/FunctionHelpers';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
			<div className='shadow-md p-2 border-blue-100 w-full card hover:opacity-70'>
				<div className='flex justify-center items-center'>
					<MImage
						src={data.image ? data.image : 'https://bizflyportal.mediacdn.vn/bizflyportal/techblog/png15910726485415.jpg'}
						alt={data.name}
						preview={false}
						style={{ height: '12rem' }}
					/>
				</div>
				<div style={{ height: '2.4rem' }}>
					<MText className='text-base text-ellipsis-2'>{data.name}</MText>
				</div>
				<div
					style={{ height: '2.4rem' }}
					className='flex justify-between items-end'
				>
					<div>
						<MText className='text-base text-red-500'>{customMoney(data.price!)}</MText>
					</div>
					<div>
						<MText className='text-md'>
							<FontAwesomeIcon
								icon={faHeart}
								color='red'
							/>
							&nbsp;
							{data.quantity}
						</MText>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default CardProduct;
