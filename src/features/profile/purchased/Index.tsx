'use client';

import MBadge from '@/components/MBadge';
import { ORDER_STATUS, PAYMENT_METHOD } from '@/constant';
import { Order, OrderParams } from '@/models/paymentModels';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingOrders } from '@/redux/reducers/orderReducer';
import { customMoney } from '@/utils/FuntionHelpers';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import Link from 'next/link';
import React, { useEffect } from 'react';

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
		title: 'Ngày giao hàng',
		dataIndex: 'deliveryDate',
		key: 'deliveryDate',
		width: 150,
		render: (item: string) => dayjs(item).format('DD/MM/YYYY'),
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
		align: 'center',
		render: (item: string) => (
			<MBadge
				count={ORDER_STATUS.find((p) => p.value === item)?.label}
				color='geekblue'
			></MBadge>
		),
	},
	{
		title: 'Action',
		key: 'operation',
		fixed: 'right',
		width: 150,
		render: (item: Order) => (
			<Link
				className='p-2 bg-blue-600 text-white hover:bg-blue-400'
				href={'/profile/purchased/details/' + item._id}
			>
				Xem chi tiết
			</Link>
		),
	},
];
const Purchased = () => {
	const { order } = useAppSelector((state) => state);
	console.log('🚀 ~ file: index.tsx:87 ~ Purchased ~ order:', order);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const params: OrderParams = {
			offset: 0,
			limit: 100,
			status: 'all',
		};
		dispatch(gettingOrders(params));
	}, [dispatch]);

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
