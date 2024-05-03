'use client';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import React, { useEffect, useState } from 'react';
import MTitle from '@/components/MTitle';
import { caculatorTotalPrice, customMoney } from '@/utils/FunctionHelpers';
import { CartProduct } from '@/models/productModels';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import CartItem from './CartItem';
import { Col } from 'antd';
import { useTranslations } from 'next-intl';
import { getCartState, updatingCart } from '@/redux/reducers/cartReducer';
import MButton from '@/components/MButton';
import MCheckbox from '@/components/MCheckbox';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

const TableCartProducts = ({ data }: { data: CartProduct[] }) => {
	const cart = useAppSelector(getCartState);
	const t = useTranslations('CartPage');
	const [summaryMoney, setSummaryMoney] = useState<string>(customMoney(caculatorTotalPrice(data)));
	const dispatch = useAppDispatch();

	const callApiUpdate = (e: CheckboxChangeEvent, item: CartProduct) => {
		const data: CartProduct = {
			_id: item?._id,
			isChecked: e.target.checked,
			quantity: item?.quantity,
		};
		dispatch(updatingCart(data));
	};

	useEffect(() => {
		if (cart?.items) {
			setSummaryMoney(customMoney(caculatorTotalPrice(cart.items.filter((item) => item.isChecked))));
		}
	}, [cart.items]);

	return (
		<>
			<div className='hidden lg:block'>
				<MRow className='bg-gray-300 font-bold py-2 px-2 '>
					<MCol span={1}></MCol>
					<MCol
						className='text-center'
						span={3}
					></MCol>
					<Col span={20}>
						<MRow className='w-full'>
							<MCol span={10}>
								<MText>{t('Name')}</MText>
							</MCol>
							<MCol span={4}>
								<MText>{t('ColumnPriceProduct')}</MText>
							</MCol>
							<MCol span={4}>
								<MText>{t('ColumnQuantityProduct')}</MText>
							</MCol>
							<MCol span={4}>
								<MText>{t('TotalPrice')}</MText>
							</MCol>
							<MCol span={2}></MCol>
						</MRow>
					</Col>
				</MRow>
			</div>

			{data.map((item, index: number) => {
				return (
					<MRow
						key={index}
						style={{ borderBottom: ' 1px solid black' }}
						align={'middle'}
					>
						<MCol
							span={1}
							className='flex justify-center'
						>
							<MCheckbox
								onChange={(e) => callApiUpdate(e, item)}
								checked={item?.isChecked}
							/>
						</MCol>
						<MCol span={23}>
							<CartItem item={item} />
						</MCol>
					</MRow>
				);
			})}

			<MTitle
				level={3}
				className='text-end pr-2'
			>
				{`${t('TotalPrice')}: ${summaryMoney}`}
			</MTitle>
			<MRow justify={'end'}>
				<MCol>
					<MButton
						link='/'
						className='mr-2 bg-green-500 hover:bg-green-300 text-white'
					>
						{t('ButtonContinueShopping')}
					</MButton>
				</MCol>
				<MCol>
					<MButton
						type='primary'
						link='/checkout'
					>
						Checkout
					</MButton>
				</MCol>
			</MRow>
		</>
	);
};

export default TableCartProducts;
