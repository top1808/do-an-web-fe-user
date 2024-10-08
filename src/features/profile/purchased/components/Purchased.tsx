'use client';

import MBadge from '@/components/MBadge';
import MButton from '@/components/MButton';
import MSkeleton from '@/components/MSkeleton';
import { ORDER_STATUS, PAYMENT_METHOD } from '@/constant';
import { Order, OrderParams, OrderProduct } from '@/models/paymentModels';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { cancelingOrder, confirmingOrder, getOrderState, gettingOrders } from '@/redux/reducers/orderReducer';
import { customMoney } from '@/utils/FunctionHelpers';
import { faBan, faCheck, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table, { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
export type OrderChooseReview = {
	order?: Order;
	isOpenModal: boolean;
};
export type ProductChooseReview = {
	product?: OrderProduct;
	isOpenModal: boolean;
};
const Purchased = () => {
	const order = useAppSelector(getOrderState);
	const dispatch = useAppDispatch();
	const t = useTranslations('ProfilePage');
	const onConfirmReceived = (item: Order) => {
		Swal.fire({
			title: 'Confirm Received Order',
			// text: 'Are you sure to cancel order ' + item?.orderCode + '?',
			showCancelButton: true,
			reverseButtons: true,
			confirmButtonText: 'Submit',
			cancelButtonText: 'Close',
		}).then((res) => {
			if (res.isConfirmed) {
				dispatch(confirmingOrder({ id: item._id || '', receivedDate: dayjs().format('YYYY-MM-DD') }));
			}
		});
	};
	const onCancelOrder = (item: Order) => {
		Swal.fire({
			title: 'Cancel Order',
			text: 'Are you sure to cancel order ' + item?.orderCode + '?',
			input: 'textarea',
			inputLabel: 'Reason',
			showCancelButton: true,
			reverseButtons: true,
			confirmButtonText: 'Submit',
			cancelButtonText: 'Close',
		}).then((res) => {
			if (res.isConfirmed) {
				dispatch(cancelingOrder({ id: item._id, reason: res.value, receivedDate: dayjs().format('YYYY-MM-DD') }));
			}
		});
	};
	useEffect(() => {
		const params: OrderParams = {
			offset: 0,
			limit: 100,
			status: 'all',
		};
		dispatch(gettingOrders(params));
	}, [dispatch, order.isChangeStatusOrder]);

	const columns: ColumnsType<Order> = [
		{
			title: <>{t('OrderID')}</>,
			dataIndex: 'orderCode',
			key: 'orderCode',
			width: 200,
		},
		{
			title: <>{t('TotalPrice')}</>,
			dataIndex: 'totalPrice',
			key: 'totalPrice',
			width: 150,
			align: 'right',
			sorter: (a, b) => a.totalPrice! - b.totalPrice!,
			render: customMoney,
		},
		{
			title: <>{t('DeliverAddress')}</>,
			dataIndex: 'deliveryAddress',
			key: 'deliveryAddress',
			width: 220,
		},
		{
			title: <>{t('CreateAt')}</>,
			dataIndex: 'createdAt',
			key: 'createdAt',
			align: 'center',
			width: 180,
			sorter: (a, b) => {
				const timestampA = Date.parse(a.createdAt! as string);
				const timestampB = Date.parse(b.createdAt! as string);

				return timestampA - timestampB;
			},
			render: (item: string) => (item ? dayjs(item).format('DD/MM/YYYY') : 'Chưa xác định'),
		},
		{
			title: <>{t('ExpectedDelivery')}</>,
			dataIndex: 'deliveryDate',
			key: 'deliveryDate',
			align: 'center',
			width: 180,
			render: (item: string) => (item ? dayjs(item).format('DD/MM/YYYY') : 'Chưa xác định'),
		},
		{
			title: <>{t('PaymentMethod')}</>,
			dataIndex: 'paymentMethod',
			key: 'paymentMethod',
			width: 200,
			render: (item: string) => PAYMENT_METHOD.find((p) => p.value === item)?.label,
		},
		{
			title: <>{t('Status.Title')}</>,
			dataIndex: 'status',
			key: 'status',
			width: 200,
			fixed: 'right',
			align: 'center',
			filters: [
				{
					text: <>{t('Status.Processing')}</>,
					value: 'processing',
				},
				{
					text: <>{t('Status.Confirmed')}</>,
					value: 'confirmed',
				},
				{
					text: <>{t('Status.Delivering')}</>,
					value: 'delivering',
				},
				{
					text: <>{t('Status.Delivered')}</>,
					value: 'delivered',
				},
				{
					text: <>{t('Status.Canceled')}</>,
					value: 'canceled',
				},
			],
			onFilter: (value, record) => record.status === value,
			render: (item: string) => (
				<MBadge
					count={t(`Status.${ORDER_STATUS.find((p) => p.value === item)?.label}`)}
					color={ORDER_STATUS.find((p) => p.value === item)?.color}
				/>
			),
		},
		{
			title: 'Action',
			key: 'operation',
			fixed: 'right',
			align: 'center',
			width: 150,
			render: (item: Order) => (
				<div className='flex gap-2 items-center justify-center'>
					<Link href={'/profile/purchased/details/' + item._id}>
						<MButton
							title='Xem chi tiết'
							className='bg-blue-600 text-white hover:bg-blue-400'
						>
							<FontAwesomeIcon icon={faEye} />
						</MButton>
					</Link>
					{item?.status === 'delivered' && (
						<MButton
							title='Xác nhận đã nhận đơn hàng'
							className='bg-green-600 text-white hover:bg-green-400'
							onClick={() => onConfirmReceived(item)}
						>
							<FontAwesomeIcon icon={faCheck} />
						</MButton>
					)}
					{item?.status === 'processing' && (
						<MButton
							title='Hủy đơn hàng'
							className='bg-red-600 text-white hover:bg-red-400'
							onClick={() => onCancelOrder(item)}
						>
							<FontAwesomeIcon icon={faBan} />
						</MButton>
					)}
				</div>
			),
		},
	];

	return (
		<>
			<MSkeleton loading={order.isChangeStatusOrder}>
				<Table
					columns={columns}
					dataSource={order.data?.map((item, index) => ({ ...item, index: index + 1, key: item._id }))}
					virtual
					scroll={{ x: 1000, y: 2000 }}
				/>
			</MSkeleton>
		</>
	);
};

export default Purchased;
