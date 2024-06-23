'use client';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import React, { useEffect, useState } from 'react';
import { caculatorTotalPriceForCheckout, customMoney } from '@/utils/FunctionHelpers';
import { CartProduct } from '@/models/productModels';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import CartItem from './CartItem';
import { Col } from 'antd';
import { useTranslations } from 'next-intl';
import { getCartState, updatingCart } from '@/redux/reducers/cartReducer';
import MCheckbox from '@/components/MCheckbox';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import MButton from '@/components/MButton';
import Link from 'next/link';
const TableCartProducts = ({ data }: { data: CartProduct[] }) => {
	const cart = useAppSelector(getCartState);
	const t = useTranslations('CartPage');
	const [summaryMoney, setSummaryMoney] = useState<string>(customMoney(caculatorTotalPriceForCheckout(data)));
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
			setSummaryMoney(customMoney(caculatorTotalPriceForCheckout(cart.items)));
		}
	}, [cart.items]);

	return (
		<MRow
			gutter={[16, 16]}
			className='px-2'
		>
			<MCol
				xl={18}
				xs={24}
				className='rounded-md'
			>
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
				{data.map((item) => {
					return (
						<MRow
							key={item._id}
							style={{ borderBottom: '1px solid black' }}
							align={'middle'}
							className='bg-white'
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
			</MCol>
			<MCol
				xl={6}
				xs={24}
			>
				<MRow
					className='bg-white p-2 w-full shadow-xl rounded-md'
					justify={'space-between'}
					gutter={[0, 16]}
				>
					<MCol span={24}>
						<h3 className='text-2xl'>Thông tin thanh toán</h3>
					</MCol>
					<MCol span={10}>
						<p className='text-lg font-semibold text-gray-500'>Total items: </p>
					</MCol>
					<MCol span={10}>
						<p className='text-lg font-semibold text-gray-700'>{cart?.items.filter((item) => item?.isChecked).length}</p>
					</MCol>
					<MCol span={10}>
						<p className='text-lg font-semibold text-gray-500'>Total count: </p>
					</MCol>
					<MCol span={10}>
						<p className='text-lg font-semibold text-gray-700'>{cart?.items.filter((item) => item?.isChecked).reduce((a, b) => a + (b?.quantity || 0), 0)}</p>
					</MCol>
					<MCol span={10}>
						<p className='text-lg font-semibold text-gray-500'>{`${t('TotalPrice')}:`} </p>
					</MCol>
					<MCol span={10}>
						<p className='text-lg font-semibold text-gray-700'>{`${summaryMoney}`}</p>
					</MCol>
					<MCol span={24}>
						<Link
							href={'/checkout'}
							className={`${!data.some((item) => item?.isChecked) ? 'pointer-events-none' : ''}`}
						>
							<MButton
								type='primary'
								disabled={!data.some((item) => item?.isChecked)}
								size='large'
								className='w-full'
							>
								{t('Checkout')}
							</MButton>
						</Link>
					</MCol>
				</MRow>
			</MCol>
		</MRow>
	);
};

export default TableCartProducts;
