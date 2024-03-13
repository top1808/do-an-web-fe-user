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
import { gettingOrderInfo } from '@/redux/reducers/orderReducer';
import { customMoney, formatDate } from '@/utils/FunctionHelpers';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface PurchasedDetailsPageProps {}

const PurchasedDetailsPage = (props: PurchasedDetailsPageProps) => {
	const { order } = useAppSelector((state) => state);

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
							<MCol span={8}>Chi tiết đơn hàng</MCol>
							<MCol
								span={16}
								className='text-blue-500'
							>
								{orderDetails?.orderCode}
							</MCol>
						</MRow>
						<MRow>
							<MCol span={8}>Ngày đặt hàng</MCol>
							<MCol
								span={16}
								className='text-blue-500'
							>
								{formatDate(orderDetails?.createdAt)}
							</MCol>
						</MRow>
						{orderDetails?.deliveryDate && (
							<MRow>
								<MCol span={8}>Dự kiến giao hàng</MCol>
								<MCol
									span={16}
									className='text-blue-500'
								>
									{formatDate(orderDetails?.deliveryDate)}
								</MCol>
							</MRow>
						)}
						<MRow>
							<MCol span={8}>Địa chỉ giao hàng</MCol>
							<MCol
								span={16}
								className='text-blue-500'
							>
								{orderDetails?.deliveryAddress}
							</MCol>
						</MRow>
						<MRow>
							<MCol span={8}>Tình trạng đơn hàng</MCol>
							<MCol span={16}>
								<MBadge
									count={ORDER_STATUS.find((p) => p.value === orderDetails?.status)?.label}
									color={ORDER_STATUS.find((p) => p.value === orderDetails?.status)?.color}
								></MBadge>
							</MCol>
						</MRow>
						<MRow>
							<MCol span={8}>Hình thức thanh toán</MCol>
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
				{orderDetails?.products?.map((product) => (
					<MRow
						gutter={12}
						key={product.productCode}
						className='mt-2 shadow-md p-2 py-4 items-center'
					>
						<MCol span={2}>
							<MImage
								className='w-full'
								src={product?.image}
								alt='image'
							/>
						</MCol>
						<MCol span={12}>{product.productName}</MCol>
						<MCol
							span={3}
							className='text-end'
						>
							{customMoney(product.price)}
						</MCol>
						<MCol
							span={3}
							className='text-end'
						>
							x{product.quantity} ={' '}
						</MCol>
						<MCol
							span={3}
							className='text-end text-red-500'
						>
							{customMoney((product?.price || 0) * (product?.quantity || 0))}
						</MCol>
					</MRow>
				))}
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
							Tổng tiền hàng:
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
							Phí vận chuyển:
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
							Tổng thanh toán:
						</MCol>
					</MRow>
					<div className='text-center'>
						<MButton onClick={() => router.back()}>Quay lại</MButton>
					</div>
				</div>
			</MCard>
		</MSkeleton>
	);
};

export default PurchasedDetailsPage;
