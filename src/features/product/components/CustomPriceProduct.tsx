import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import { customMoney } from '@/utils/FunctionHelpers';
import React from 'react';

const CustomPriceProduct = ({
	isProductSKU,
	isPercent,
	oldPrice,
	price = 0,
	discountValue,
	promotionPrice,
	priceProductDiscount,
}: {
	isProductSKU?: boolean;
	isPercent?: boolean;
	oldPrice?: number;
	price?: string | number;
	discountValue?: number;
	promotionPrice?: number;
	priceProductDiscount?: string;
}) => {
	return (
		<div className='bg-white p-2'>
			<MRow
				gutter={16}
				align={'middle'}
			>
				{oldPrice && (
					<MCol>
						<MText className='line-through text-gray-500 text-md'>{customMoney(oldPrice)}</MText>
					</MCol>
				)}
				<MCol>
					<MText className={`text-xl font-bold  ${promotionPrice || (priceProductDiscount && !isProductSKU) ? 'line-through text-gray-600 text-xs' : 'text-red-500'}`}>{price}</MText>
				</MCol>
				{priceProductDiscount && !oldPrice && !discountValue && !isProductSKU && (
					<MCol>
						<MText className={`text-xl font-bold text-red-500 }`}>{priceProductDiscount}</MText>
					</MCol>
				)}
				{discountValue && (
					<>
						<MCol>
							<MText className={`text-xl font-bold text-red-500 }`}>{customMoney(promotionPrice!)}</MText>
						</MCol>
						<MCol>
							<MText className='text-white p-2 bg-red-400 rounded-md hidden lg:block'>{`- ${isPercent ? discountValue + '%' : customMoney(discountValue)}`}</MText>
						</MCol>
					</>
				)}
			</MRow>
		</div>
	);
};

export default CustomPriceProduct;
