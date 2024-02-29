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
import { Col } from 'antd';

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
			<div className='hidden lg:block'>
				<MRow className='bg-gray-300 font-bold py-2 px-2 '>
					<MCol
						className='text-center'
						span={3}
					></MCol>
					<Col span={21}>
						<MRow className='w-full'>
							<MCol span={10}>
								<MText>Tên sản phẩm</MText>
							</MCol>
							<MCol span={4}>
								<MText>Giá</MText>
							</MCol>
							<MCol span={4}>
								<MText>Số lượng</MText>
							</MCol>
							<MCol span={4}>
								<MText>Thành tiền</MText>
							</MCol>
							<MCol span={2}></MCol>
						</MRow>
					</Col>
				</MRow>
			</div>

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
