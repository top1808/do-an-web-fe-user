import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import { customMoney } from '@/utils/FunctionHelpers';
import React from 'react';

const CustomPriceProduct = ({
	oldPrice,
	price = 0,
	discountValue,
	promotionPrice,
}: {
	oldPrice?: number | null;
	price?: string | number;
	discountValue?: number | null;
	promotionPrice?: number | null;
}) => {
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
					<MText className={`text-xl font-bold text-red-500 ${promotionPrice ? 'line-through text-gray-600 text-xs' : ''}`}>{price}</MText>
				</MCol>

				{!!discountValue && (
					<>
						<MCol>
							<MText className={`text-xl font-bold text-red-500 }`}>{customMoney(promotionPrice!)}</MText>
						</MCol>
						<MCol>
							<MText className='text-white p-2 bg-red-400 rounded-md'>{`Sale ${discountValue}%`}</MText>
						</MCol>
					</>
				)}
			</MRow>
		</div>
	);
};

export default CustomPriceProduct;
