import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import { customMoney } from '@/utils/FuntionHelpers';
import React from 'react';

const CustomPriceProduct = ({ price = 0, sales = 0 }: { price?: number; sales?: number }) => {
	return (
		<div className='bg-slate-100 p-2 '>
			<MRow
				gutter={16}
				align={'middle'}
			>
				{/* <MCol>
					<MText className='line-through text-gray-500 text-md'>{customMoney(price)}</MText>
				</MCol> */}
				<MCol>
					<MText className='text-xl font-bold text-red-500'>{customMoney((price * (100 - sales)) / 100)}</MText>
				</MCol>
				{sales > 0 && (
					<MCol>
						<MText className='text-white p-2 bg-red-400 rounded-md'>{`Sale ${sales}%`}</MText>
					</MCol>
				)}
			</MRow>
		</div>
	);
};

export default CustomPriceProduct;
