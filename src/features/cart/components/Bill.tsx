'use client';
import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MTable from '@/components/MTable';
import MText from '@/components/MText';
import MTitle from '@/components/MTitle';
// import { dataFake } from '@/features/product/components/DetailProduct';
import { Bill } from '@/models/billModels';
import { Product } from '@/models/productModels';
import { caculatorTotalPrice, customMoney } from '@/utils/FuntionHelpers';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
// const fakeBill: Bill = {
// 	_id: '12321321312',
// 	dateOrder: '20/12/1999',
// 	paymentMethod: 'Tiền mặt',
// 	items: [
// 		{ _id: dataFake.id, name: dataFake.name, price: dataFake.price, quantity: 10, totalPrice: 1000000 },
// 		{ _id: '1123', name: dataFake.name, price: dataFake.price, quantity: 10, totalPrice: 1000000 },
// 	],
// };

const BillComponent = () => {
	const columns: ColumnsType<Product> = [
		{
			title: '#',
			dataIndex: '_id',
			key: '_id',
			width: '20%',
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			width: '20%',
		},

		{
			title: 'Quantity',
			dataIndex: 'quantity',
			key: 'quantity',
			width: '10%',
			align: 'end',
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			width: '20%',
			align: 'end',
			render: (value) => customMoney(value),
		},
		{
			title: 'Total Price',
			dataIndex: 'totalPrice',
			key: 'totalPrice',
			width: '30%',
			align: 'end',

			render: (value) => customMoney(value),
		},
	];
	return (
		<MRow className='py-2 w-full'>
			<MCol className='w-full'>
				<MRow className='bg-green-400 w-full'>
					<MText className='px-8 py-2 font-semibold text-lg text-green-800'>Đơn hàng của bạn đã được đặt thành công !!!</MText>
				</MRow>
				<MRow className='mt-2 p-4 shadow-xl'>
{/* 					<MCol className='w-full'>
						<MTitle level={3}>
							Mã đơn hàng của bạn: <span className='font-bold'>{fakeBill._id}</span>
						</MTitle>
						<MTitle level={4}>
							Ngày đặt: <span className='font-bold'>{fakeBill.dateOrder}</span>
						</MTitle>
						<MTitle level={4}>
							Phương thức thanh toán: <span className='font-bold'>{fakeBill.paymentMethod}</span>
						</MTitle>
						<div className='w-full'>
							<MTitle
								level={5}
								style={{ color: 'red' }}
								className='opacity-90'
							>
								Thông tin đơn hàng :
							</MTitle>
							<MTable
								className='w-full'
								columns={columns}
								dataSource={fakeBill.items}
								rowKey={'_id'}
							/>
							<div className='text-end p-4'>
								<MText className='text-lg font-semibold'>{`Tổng thanh toán: ${customMoney(caculatorTotalPrice(fakeBill.items))}`}</MText>
							</div>
						</div>
					</MCol> */}
				</MRow>
				<MRow
					justify={'end'}
					className='p-4'
				>
					<MCol>
						<MButton
							type='primary'
							link='/'
						>
							Tiếp tục mua hàng
						</MButton>
					</MCol>
				</MRow>
			</MCol>
		</MRow>
	);
};
export default BillComponent;
