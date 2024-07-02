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
			justify={'end'}
		>
			<MCol
				span={24}
				className='rounded-md'
			>
				<div className='hidden lg:block mb-4'>
					<MRow className='shadow-xl bg-white font-bold py-4 px-2'>
						<MCol span={1}></MCol>
						<MCol
							className='text-center'
							span={3}
						>
							<p>Image</p>
						</MCol>
						<Col span={20}>
							<MRow className='w-full'>
								<MCol span={12}>
									<MText>{t('Name')}</MText>
								</MCol>
								<MCol span={4}>
									<MText>{t('ColumnPriceProduct')}</MText>
								</MCol>
								<MCol span={3}>
									<MText>{t('ColumnQuantityProduct')}</MText>
								</MCol>
								<MCol span={3}>
									<MText>{t('SubTotal')}</MText>
								</MCol>
								<MCol span={2}></MCol>
							</MRow>
						</Col>
					</MRow>
				</div>
				<div className='flex flex-col gap-4'>
					{data.map((item) => {
						return (
							<MRow
								key={item._id}
								align={'middle'}
								className='bg-white shadow-xl py-1'
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
				</div>
			</MCol>
			<MCol
				span={24}
				className='sticky bottom-0 '
			>
				<MRow
					className='rounded-md shadow-2xl bg-white ư-full'
					align={'middle'}
				>
					<MCol span={12}>
						<MRow justify={'start'}>
							<MCol
								span={24}
								className='px-8 py-2'
							>
								<p className='text-lg font-semibold text-gray-500'>{`Total checked: ${cart?.items.filter((item) => item?.isChecked).length} items.`}</p>
							</MCol>
						</MRow>
					</MCol>
					<MCol
						span={12}
						className='px-8 py-4 w-full '
					>
						<MRow
							gutter={[8, 0]}
							justify={'end'}
							align={'bottom'}
						>
							<MCol>
								<p className='text-lg font-semibold text-gray-500 text-end'>{`Total quantity items: ${cart?.items.filter((item) => item?.isChecked).reduce((a, b) => a + (b?.quantity || 0), 0)}`}</p>
								<p className='text-lg font-semibold text-gray-500'>
									{t('TotalPrice')} <span className='text-lg font-semibold text-red-500'>{summaryMoney}</span>
								</p>
							</MCol>
							<MCol>
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
			</MCol>
		</MRow>
	);
};

export default TableCartProducts;
