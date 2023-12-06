'use client';

import { OrderParams } from '@/models/paymentModels';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingOrders } from '@/redux/reducers/orderReducer';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import React, { useEffect } from 'react';
interface DataType {
	key: React.Key;
	id: string;
	sale: number;
	sumary: number;
	time: string;
	paymentMethod: string;
	status: string;
}
const dataSource = [
	{
		key: '232432',
		id: '12312312',
		sale: 38,
		sumary: 1400000,
		time: '1991/1/1',
		paymentMethod: 'Tiền mặt',
		status: 'Đã giao hàng',
	},
	{
		key: '112311',
		id: '2312312312',
		sale: 38,
		sumary: 2421423423432,
		time: '1991/1/1',
		paymentMethod: 'Vietcombank',
		status: 'Chưa giao hàng',
	},
];

const columns: ColumnsType<DataType> = [
	{
		title: 'Mã đơn hàng',
		dataIndex: 'orderCode',
		key: 'orderCode',
	},
	{
		title: 'Tổng tiền',
		dataIndex: 'totalPrice',
		key: 'totalPrice',
	},
	{
		title: 'Tổng tiền',
		dataIndex: 'sumary',
		key: 'sumary',
		sorter: (a, b) => a.sumary - b.sumary,
	},
	{
		title: 'Thời gian',
		dataIndex: 'time',
		key: 'time',
		// sorter: (a, b) => ,
	},
	{
		title: 'Hình thức thanh toán',
		dataIndex: 'paymentMethod',
		key: 'paymentMethod',
	},
	{
		title: 'Tình trạng đơn hàng',
		dataIndex: 'status',
		key: 'status',
	},
	{
		title: 'Action',
		key: 'operation',
		render: () => (
			<Link
				className='p-2 bg-blue-400 text-white hover:text-red-400'
				href={'/'}
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
			dataSource={dataSource}
		/>
	);
};

export default Purchased;
