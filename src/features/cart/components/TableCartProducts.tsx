'use client';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import React, { useEffect, useState } from 'react';
import MTitle from '@/components/MTitle';
import { caculatorTotalPrice, customMoney } from '@/utils/FunctionHelpers';
import { CartProduct } from '@/models/productModels';
import { useAppSelector } from '@/redux/hooks';
import CartItem from './CartItem';

const TableCartProducts = ({ data }: { data: CartProduct[] }) => {
	const { cart } = useAppSelector((state) => state);
	const [summaryMoney, setSummaryMoney] = useState<string>(customMoney(caculatorTotalPrice(data)));

	useEffect(() => {
		if (cart?.items) {
			setSummaryMoney(customMoney(caculatorTotalPrice(cart.items)));
		}
	}, [cart.items]);

	return (
		<>
			<MRow className='bg-gray-400 py-2 px-2'>
				<MCol
					className='text-center'
					span={3}
				></MCol>
				<MCol span={9}>
					<MText>Tên sản phẩm</MText>
				</MCol>
				<MCol
					className='text-end'
					span={3}
				>
					<MText>Giá</MText>
				</MCol>
				<MCol
					className='text-center'
					span={3}
				>
					<MText>Số lượng</MText>
				</MCol>
				<MCol
					className='text-end'
					span={4}
				>
					<MText>Thành tiền</MText>
				</MCol>
				<MCol span={2}></MCol>
			</MRow>
			{data.map((item, index: number) => {
				return (
					<CartItem
						key={index}
						item={item}
					/>
				);
			})}

			<MTitle
				level={3}
				className='text-end pr-2'
			>
				{`Tổng tiền: ${summaryMoney}`}
			</MTitle>
		</>
	);
};

export default TableCartProducts;
