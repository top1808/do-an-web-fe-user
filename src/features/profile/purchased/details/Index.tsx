'use client';
import MBadge from '@/components/MBadge';
import MButton from '@/components/MButton';
import MCard from '@/components/MCard';
import MCol from '@/components/MCol';
import MImage from '@/components/MImage';
import MRow from '@/components/MRow';
import MSkeleton from '@/components/MSkeleton';
import { ORDER_STATUS, PAYMENT_METHOD } from '@/constant';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getOrderState, gettingOrderInfo } from '@/redux/reducers/orderReducer';
import { customMoney, formatDate } from '@/utils/FunctionHelpers';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface PurchasedDetailsPageProps {}

const PurchasedDetailsPage = (props: PurchasedDetailsPageProps) => {
	const order = useAppSelector(getOrderState);
	const t = useTranslations('ProfilePage');

	const { orderDetails } = order;
	const dispatch = useAppDispatch();
	const router = useRouter();
	const params = useParams();
	const { id } = params;

	useEffect(() => {
		if (id) {
			dispatch(gettingOrderInfo(id as string));
		}
	}, [dispatch, id]);
	return (
		<MSkeleton loading={order.loading}>
			<MCard
				title={
					<div className='py-2'>
						<MRow>
							<MCol span={8}>{t('OrderDetail')}</MCol>
							<MCol
								span={16}
								className='text-blue-500'
							>
								{orderDetails?.orderCode}
							</MCol>
						</MRow>
						<MRow>
							<MCol span={8}>{t('CreateAt')}</MCol>
							<MCol
								span={16}
								className='text-blue-500'
							>
								{formatDate(orderDetails?.createdAt)}
							</MCol>
						</MRow>
						{orderDetails?.deliveryDate && (
							<MRow>
								<MCol span={8}>{t('ExpectedDelivery')}</MCol>
								<MCol
									span={16}
									className='text-blue-500'
								>
									{formatDate(orderDetails?.deliveryDate)}
								</MCol>
							</MRow>
						)}
						<MRow>
							<MCol span={8}>{t('DeliverAddress')}</MCol>
							<MCol
								span={16}
								className='text-blue-500'
							>
								{orderDetails?.deliveryAddress}
							</MCol>
						</MRow>
						<MRow>
							<MCol span={8}>{t('Status.Title')}</MCol>
							<MCol span={16}>
								<MBadge
									count={t(`Status.${ORDER_STATUS.find((p) => p.value === orderDetails?.status)?.label}`)}
									color={ORDER_STATUS.find((p) => p.value === orderDetails?.status)?.color}
								/>
							</MCol>
						</MRow>
						<MRow>
							<MCol span={8}>{t('PaymentMethod')}</MCol>
							<MCol
								span={16}
								className='text-blue-500'
							>
								{PAYMENT_METHOD.find((p) => p.value === orderDetails?.paymentMethod)?.label}
							</MCol>
						</MRow>
					</div>
				}
			>
				{orderDetails?.products?.map(
					(product) =>
						product && (
							<MRow
								gutter={12}
								key={product?.productCode}
								className='mt-2 shadow-md p-2 py-4 items-center'
							>
								<MCol span={2}>
									<MImage
										className='w-full'
										src={product?.image}
										alt={product.productName || 'image'}
									/>
								</MCol>

								<MCol span={12}>
									<div>
										<p className='font-semibold'>{product.productName}</p>
									</div>
									{product?.options?.map((group) => (
										<div key={group?.groupName}>
											<p className='text-gray-500'>
												{group?.groupName}: {group?.option}
											</p>
										</div>
									))}
								</MCol>
								<MCol
									span={3}
									className='text-end'
								>
									{customMoney(product?.price)}
								</MCol>
								<MCol
									span={3}
									className='text-end'
								>
									x{product?.quantity} ={' '}
								</MCol>
								<MCol
									span={3}
									className='text-end text-red-500 font-semibold'
								>
									{customMoney((product?.price || 0) * (product?.quantity || 0))}
								</MCol>
							</MRow>
						),
				)}
				<div className='mt-4'>
					<MRow className='flex-row-reverse text-base font-bold'>
						<MCol
							span={4}
							className='text-end text-red-500'
						>
							{customMoney(orderDetails?.totalProductPrice)}
						</MCol>
						<MCol
							span={4}
							className='text-end'
						>
							{`${t('DeliveryFee')} :`}
						</MCol>
					</MRow>
					<MRow className='flex-row-reverse text-base font-bold'>
						<MCol
							span={4}
							className='text-end text-red-500'
						>
							{customMoney(orderDetails?.deliveryFee)}
						</MCol>
						<MCol
							span={4}
							className='text-end'
						>
							{`${t('TotalPrice')} :`}
						</MCol>
					</MRow>
					{!!orderDetails?.voucherCode && (
						<MRow className='flex-row-reverse text-base font-bold'>
							<MCol
								span={4}
								className='text-end text-red-500'
							>
								-{customMoney(orderDetails?.voucherDiscount)}
							</MCol>
							<MCol
								span={4}
								className='text-end'
							>
								Voucher:
							</MCol>
						</MRow>
					)}
					<MRow className='flex-row-reverse text-base font-bold'>
						<MCol
							span={4}
							className='text-end text-red-500'
						>
							{customMoney(orderDetails?.totalPrice)}
						</MCol>
						<MCol
							span={4}
							className='text-end'
						>
							{`${t('TotalPaid')} :`}
						</MCol>
					</MRow>
					<div className='text-center'>
						<MButton onClick={() => router.back()}>{t('Back')}</MButton>
					</div>
				</div>
			</MCard>
		</MSkeleton>
	);
};

export default PurchasedDetailsPage;
