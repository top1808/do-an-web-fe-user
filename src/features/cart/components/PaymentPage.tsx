import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MImage from '@/components/MImage';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import MTitle from '@/components/MTitle';
import { PAYMENT_METHOD } from '@/constant';
import { DataPayment } from '@/models/paymentModels';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { paying } from '@/redux/reducers/cartReducer';
import { caculatorTotalPrice, customMoney } from '@/utils/FuntionHelpers';
import { Form, Radio } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const PaymentPage = () => {
	const { cart, auth } = useAppSelector((state) => state);

	const dispatch = useAppDispatch();

	const [form] = Form.useForm();

	const onSubmit = (data: DataPayment) => {
		const dataPost: DataPayment = {
			...data,
			products: cart.items?.map((p) => ({
				cartId: p._id,
				productName: p.product?.name,
				productCode: p.product?._id,
				quantity: p.quantity,
				price: p.price,
				totalPrice: p.totalPrice,
				note: '',
			})),
			totalProductPrice: caculatorTotalPrice(cart.items),
			totalPaid: 0,
			deliveryFee: 30000,
			totalPrice: caculatorTotalPrice(cart.items) + 30000,
		};
		dispatch(paying(dataPost));
	};

	useEffect(() => {
		form.setFieldsValue({
			customerName: auth.currentUserInfo?.name,
			customerPhone: auth.currentUserInfo?.phoneNumber,
			customerEmail: auth.currentUserInfo?.email,
			deliveryAddress: auth.currentUserInfo?.address,
			note: '',
			paymentMethod: 'cash',
		});
	}, [form, auth]);

	useEffect(() => {
		if (cart.payingStatus === 'completed' && cart.orderInfo) {
			Swal.fire({
				html: `Mã đơn hàng của bạn là <a color="blue" href='/profile/purchased'>${cart.orderInfo?.orderCode}</a>`,
				title: 'Thanh toán thành công',
				icon: 'success',
				confirmButtonText: 'Tiếp tục mua sắm',
			}).then((result) => {
				if (result.isConfirmed) {
					window.location.assign('/');
				}
			});
		} else if (cart.payingStatus === 'failed') {
			Swal.fire({
				title: 'Thanh toán thất bại',
				text: 'Có lỗi xảy ra trong quá trình thanh toán',
				icon: 'error',
				confirmButtonText: 'Ẩn',
			});
		}
	}, [cart.orderInfo, cart.payingStatus]);

	return (
		<Form
			autoComplete='off'
			onFinish={onSubmit}
			form={form}
		>
			<MRow justify='space-between'>
				<MCol
					span={7}
					className='shadow-md'
				>
					<MTitle
						level={5}
						className='p-2 w-full bg-lime-600 text-base'
						style={{ color: 'white' }}
					>
						1. ĐỊA CHỈ THANH TOÁN VÀ GIAO HÀNG
					</MTitle>
					<div className='p-4'>
						<h4>THÔNG TIN THANH TOÁN</h4>
						<Form.Item<DataPayment>
							name={'customerName'}
							rules={[{ required: true, message: 'Please input your name!' }]}
						>
							<MInput placeholder='Họ và tên' />
						</Form.Item>
						<Form.Item<DataPayment>
							name={'customerPhone'}
							rules={[{ required: true, message: 'Please input your phone!' }]}
						>
							<MInput placeholder='Số điện thoại' />
						</Form.Item>
						<Form.Item<DataPayment> name='customerEmail'>
							<MInput placeholder='Email' />
						</Form.Item>
						<Form.Item<DataPayment>
							name={'deliveryAddress'}
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
					span={9}
					className='flex flex-col justify-between shadow-md'
				>
					<div>
						<MTitle
							level={5}
							className='p-2 w-full bg-lime-600 text-base'
							style={{ color: 'white' }}
						>
							2. Sản phẩm
						</MTitle>
						<div style={{ height: '30rem', overflow: 'auto' }}>
							{cart.items?.map((item) => {
								return (
									<div
										key={item._id}
										className='flex gap-4 p-2 shadow-md'
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
				</MCol>

				<MCol
					span={7}
					className='shadow-md'
				>
					<MTitle
						level={5}
						className='p-2 w-full bg-lime-600 text-base'
						style={{ color: 'white' }}
					>
						3. Thanh Toán
					</MTitle>
					{/* <Form.Item<DataPayment> name={'deliveryMethod'}>
						<MSelect
							className='px-2'
							value={value}
							onChange={(value: string) => setValue(value)}
							options={[
								{ value: 'normal', label: 'Viettel Post' },
								{ value: 'save', label: 'VNPost Tiết Kiệm' },
								{ value: 'speed', label: 'AhaMove (Hỏa tốc )' },
							]}
						/>
					</Form.Item> */}
					<div
						className='p-2 flex flex-col justify-between'
						style={{ height: 'calc(100% - 40px)' }}
					>
						<div>
							<h4 className='text-base'>Phương thức thanh toán</h4>
							<Form.Item<DataPayment> name={'paymentMethod'}>
								<Radio.Group
									className='px-2'
									optionType='default'
									options={PAYMENT_METHOD}
								></Radio.Group>
							</Form.Item>
						</div>
						{/* <div className='flex gap-2 items-center justify-between'>
							<MText className='text-base font-bold'>Voucher</MText>
							<MButton
								type='link'
								className='p-0 text-blue-600'
							>
								Chọn Voucher
							</MButton>
						</div> */}

						<div className='w-full text-end p-2'>
							<div className='flex items-center justify-between'>
								<MText className='text-end text-sm'>Tổng tiền hàng</MText>
								<MText className='text-end font-bold text-sm'>{customMoney(caculatorTotalPrice(cart.items))}</MText>
							</div>
							<div className='flex items-center justify-between mt-2'>
								<MText className='text-end text-sm'>Phí vận chuyển</MText>
								<MText className='text-end font-bold text-sm'>{customMoney(30000)}</MText>
							</div>
							<div className='flex items-center justify-between mt-2'>
								<MText className='text-end text-sm'>Tổng thanh toán</MText>
								<MText className='text-end font-bold text-sm'>{customMoney(caculatorTotalPrice(cart.items) + 30000)}</MText>
							</div>
							<MButton
								className='mt-2'
								htmlType='submit'
								type='primary'
							>
								Đặt hàng
							</MButton>
						</div>
					</div>
				</MCol>
			</MRow>
		</Form>
	);
};

export default PaymentPage;
