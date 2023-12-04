import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MImage from '@/components/MImage';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import MSelect from '@/components/MSelect';
import MText from '@/components/MText';
import MTitle from '@/components/MTitle';
import { PaymentForm } from '@/models/paymentModel';
import { DataPayment } from '@/models/paymentModels';
import { CartProduct, Product } from '@/models/productModels';
import { caculatorTotalPrice, customMoney } from '@/utils/FuntionHelpers';
import { Form, Radio } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';

const PaymentPage = ({ data }: { data: CartProduct[] }) => {
	console.log('🚀 ~ file: PaymentPage.tsx:18 ~ PaymentPage ~ data:', data);
	const initialValues: PaymentForm = {};
	const [value, setValue] = useState('normal');
	return (
		<Form
			autoComplete='off'
			onFinish={(values: any) => console.log(values)}
			initialValues={initialValues}
		>
			<MRow justify={'space-between'}>
				<MCol
					span={7}
					className='shadow-lg'
				>
					<MTitle
						level={4}
						className='pl-2 w-full bg-red-600'
						style={{ color: 'white' }}
					>
						1. ĐỊA CHỈ THANH TOÁN VÀ GIAO HÀNG
					</MTitle>
					<div className='p-4'>
						<h4>THÔNG TIN THANH TOÁN</h4>
						<Form.Item<DataPayment>
							name={'nameCustomer'}
							rules={[{ required: true, message: 'Please input your name!' }]}
						>
							<MInput placeholder='Họ và tên' />
						</Form.Item>
						<Form.Item<DataPayment>
							name={'phone'}
							rules={[{ required: true, message: 'Please input your phone!' }]}
						>
							<MInput placeholder='Số điện thoại' />
						</Form.Item>
						<Form.Item<DataPayment> name='email'>
							<MInput placeholder='Email' />
						</Form.Item>
						<Form.Item<DataPayment>
							name={'location'}
							rules={[{ required: true, message: 'Please input your address!' }]}
						>
							<MInput placeholder='Địa chỉ chi tiết' />
						</Form.Item>
						<Form.Item<DataPayment> name='note'>
							<TextArea placeholder='Ghi chú đơn hàng' />
						</Form.Item>
					</div>
				</MCol>
				<MCol
					span={7}
					className='shadow-lg'
				>
					<MTitle
						level={4}
						className='pl-2 w-full bg-red-600'
						style={{ color: 'white' }}
					>
						2. THANH TOÁN VÀ VẬN CHUYỂN
					</MTitle>
					<Form.Item<DataPayment> name={'deliveryMethod'}>
						<MSelect
							className='px-2'
							defaultValue={'normal'}
							value={value}
							onChange={(value: string) => setValue(value)}
							options={[
								{ value: 'normal', label: 'Viettel Post' },
								{ value: 'save', label: 'VNPost Tiết Kiệm' },
								{ value: 'speed', label: 'AhaMove (Hỏa tốc )' },
							]}
						/>
					</Form.Item>
					<Form.Item<DataPayment> name={'paymentMethod'}>
						<Radio.Group
							className='px-2'
							defaultValue={'tien-mat'}
						>
							<Radio.Button value='tien-mat'>Tiền mặt</Radio.Button>
							<Radio.Button value='momo'>Momo</Radio.Button>
							<Radio.Button value='vietcomBank'>VietcomBank</Radio.Button>
						</Radio.Group>
					</Form.Item>
				</MCol>
				<MCol
					span={7}
					className='flex flex-col justify-between shadow-lg'
				>
					<div>
						<MTitle
							level={4}
							className='pl-2 xw-full bg-red-600'
							style={{ color: 'white' }}
						>
							3. THÔNG TIN ĐƠN HÀNG
						</MTitle>
						<div>
							{data.map((item) => {
								return (
									<div
										key={item._id}
										className='flex gap-4 p-2 shadow-lg'
									>
										<div>
											<MImage
												src={item.product?.image}
												alt='image'
												preview={false}
												height={60}
												width={60}
											/>
										</div>
										<div>
											<MText className='font-medium'>{item?.product?.name}</MText>
											<div className='flex gap-4'>
												<MText className='font-medium'>{`Số lượng: ${item.quantity}`}</MText>
												<MText className='font-medium'>{`Tổng Giá: ${customMoney(item?.totalPrice || 0)}`}</MText>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
					<div className='w-full text-end p-2'>
						<MText className='p-2 text-end font-bold text-sm'>{`Summary : ${customMoney(caculatorTotalPrice(data))}`}</MText> <br />
						<MButton
							className='mt-2'
							htmlType='submit'
							type='primary'
						>
							OK
						</MButton>
					</div>
				</MCol>
			</MRow>
		</Form>
	);
};

export default PaymentPage;
