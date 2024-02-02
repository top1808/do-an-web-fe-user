import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import { customMoney } from '@/utils/FunctionHelpers';
import React from 'react';

const CustomPriceProduct = ({ oldPrice, price = 0, discount }: { oldPrice?: number | null; price?: number; discount?: number | null }) => {
	return (
		<div className='bg-white p-2'>
			<MRow
				gutter={16}
				align={'middle'}
			>
				{!!oldPrice && (
					<MCol>
						<MText className='line-through text-gray-500 text-md'>{customMoney(oldPrice)}</MText>
					</MCol>
				)}
				<MCol>
					<MText className='text-xl font-bold text-red-500'>{customMoney(price)}</MText>
				</MCol>
				{!!discount && (
					<MCol>
						<MText className='text-white p-2 bg-red-400 rounded-md'>{`Sale ${discount}%`}</MText>
					</MCol>
				)}
			</MRow>
		</div>
	);
};

export default CustomPriceProduct;
