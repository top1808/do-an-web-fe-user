'use client';

import MBadge from '@/components/MBadge';
import MButton from '@/components/MButton';
import { ORDER_STATUS, PAYMENT_METHOD } from '@/constant';
import { Order, OrderParams } from '@/models/paymentModels';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { cancelingOrder, gettingOrders } from '@/redux/reducers/orderReducer';
import { customMoney } from '@/utils/FuntionHelpers';
import { faBan, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import Link from 'next/link';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const Purchased = () => {
	const { order } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();

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
				dispatch(cancelingOrder(item._id || ''));
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
	}, [dispatch, order.isCancelingOrder]);

	const columns: ColumnsType<Order> = [
		{
			title: 'Mã đơn hàng',
			dataIndex: 'orderCode',
			key: 'orderCode',
			width: 240,
		},
		{
			title: 'Tổng tiền',
			dataIndex: 'totalPrice',
			key: 'totalPrice',
			width: 150,
			align: 'right',
			render: customMoney,
		},
		{
			title: 'Địa chỉ giao hàng',
			dataIndex: 'deliveryAddress',
			key: 'deliveryAddress',
			width: 300,
		},
		{
			title: 'Dự kiến giao hàng',
			dataIndex: 'deliveryDate',
			key: 'deliveryDate',
			align: 'center',
			width: 180,
			render: (item: string) => (item ? dayjs(item).format('DD/MM/YYYY') : 'Chưa xác định'),
		},
		{
			title: 'Hình thức thanh toán',
			dataIndex: 'paymentMethod',
			key: 'paymentMethod',
			width: 200,
			render: (item: string) => PAYMENT_METHOD.find((p) => p.value === item)?.label,
		},
		{
			title: 'Tình trạng đơn hàng',
			dataIndex: 'status',
			key: 'status',
			width: 200,
			fixed: 'right',
			align: 'center',
			render: (item: string) => (
				<MBadge
					count={ORDER_STATUS.find((p) => p.value === item)?.label}
					color={ORDER_STATUS.find((p) => p.value === item)?.color}
				></MBadge>
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
					{item?.status !== 'delivered' && item?.status !== 'received' && item?.status !== 'canceled' && (
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
		<Table
			columns={columns}
			dataSource={order.data?.map((item, index) => ({ ...item, index: index + 1, key: item._id }))}
			virtual
			scroll={{ x: 1000, y: 2000 }}
		/>
	);
};

export default Purchased;
