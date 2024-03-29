import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MImage from '@/components/MImage';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import MTitle from '@/components/MTitle';
import { PAYMENT_METHOD } from '@/constant';
import { DataPayment, ParamsGetFeeDelivery, ParamsGetService } from '@/models/paymentModels';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { paying } from '@/redux/reducers/cartReducer';
import { toggleModal } from '@/redux/reducers/modalReducer';
import { caculatorTotalPrice, customMoney, paymentWithVPN } from '@/utils/FunctionHelpers';
import { Form, FormInstance, Radio } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import ModalVoucher from './ModalVoucher';
import { usePathname } from 'next/navigation';
import MSelect from '@/components/MSelect';
import { gettingDistricts, gettingFeeDelivery, gettingProvinces, gettingWards } from '@/redux/reducers/addressReducer';
import AddressApi from '@/api/addressApi';
import { DefaultOptionType } from 'antd/es/select';
import { toast } from 'react-toastify';

const PaymentPage = () => {
	const { cart, auth, voucher, address } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const [form] = Form.useForm();
	const pathname = usePathname();
	const [services, setServices] = useState<DefaultOptionType[]>([]);
	const getServiceDelivery = async (districID: string) => {
		const body: ParamsGetService = {
			from_district: '1450',
			shop_id: '4925558',
			to_district: districID,
		};
		const { data } = await AddressApi.getService(body);

		if (data.data) {
			const optionsService = data.data.map((option: DefaultOptionType) => {
				return {
					label: option.short_name.replace('Chuyển phát', '').trim(),
					value: option.service_id,
				};
			});
			setServices(optionsService);
		} else {
			toast.warning('Hệ thống không hỗ trợ giao hàng huyện này !');
		}
	};
	const getFeeOrder = async (form: FormInstance<DataPayment>) => {
		if (form.getFieldValue('deliveryMethod') && form.getFieldValue('customerDistrict') && form.getFieldValue('customerWard')) {
			const data: DataPayment = form.getFieldsValue();
			const body: ParamsGetFeeDelivery = {
				from_district_id: 1450,
				from_ward_code: 20805,
				service_id: data.deliveryMethod!,
				to_district_id: data.customerDistrict!,
				to_ward_code: data.customerWard!,
				height: 50,
				length: 20,
				weight: 200,
				width: 20,
				insurance_value: caculatorTotalPrice(cart.items),
				cod_failed_amount: 100000,
			};
			dispatch(gettingFeeDelivery(body));
		}
	};
	const onSubmit = async (data: DataPayment) => {
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
			deliveryFee: address.fee,
			totalProductPrice: caculatorTotalPrice(cart.items),
			totalPaid: 0,
			totalPrice: caculatorTotalPrice(cart.items) + address.fee,
			voucher: voucher.voucherApply,
		};
		if (dataPost.paymentMethod === 'vnpay') {
			const date = new Date();
			const code =
				date.getFullYear() +
				('0' + (date.getMonth() + 1)).slice(-2) +
				('0' + date.getDate()).slice(-2) +
				('0' + date.getHours()).slice(-2) +
				('0' + date.getMinutes()).slice(-2) +
				('0' + date.getSeconds()).slice(-2);
			const ip = cart.ipCustomer!;
			const data = {
				amount: dataPost.totalPrice || 0,
				code: code,
				ip: ip,
				info: `Thanh toán cho order ${code}`,
				returnURL: `http://localhost:3000/${pathname}`,
			};
			localStorage.setItem('tempDataPayement', JSON.stringify(dataPost));
			paymentWithVPN({ ...data });
		} else {
			dispatch(paying(dataPost));
		}
	};

	useEffect(() => {
		form.setFieldsValue({
			customerName: auth.currentUserInfo?.name,
			customerPhone: auth.currentUserInfo?.phoneNumber,
			customerEmail: auth.currentUserInfo?.email,
			deliveryAddress: auth.currentUserInfo?.address,
			note: '',
			paymentMethod: 'cash',
			deliveryFee: address.fee,
		});
	}, [form, auth, address.fee]);

	useEffect(() => {
		dispatch(gettingProvinces());
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
		localStorage.removeItem('tempDataPayement');
	}, [cart.orderInfo, cart.payingStatus, dispatch]);

	return (
		<>
			<ModalVoucher />
			<Form
				autoComplete='off'
				onFinish={onSubmit}
				form={form}
			>
				<MRow justify='space-between'>
					<MCol
						xs={24}
						md={7}
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
								name='customerProvince'
								rules={[{ required: true, message: 'Please choose province !' }]}
							>
								<MSelect
									loading={address.loading}
									onChange={(value) => {
										form.setFieldValue('customerDistrict', undefined);
										form.setFieldValue('customerWard', undefined);
										form.setFieldValue('deliveryMethod', undefined);
										dispatch(gettingDistricts(value));
									}}
									options={[...address.provinces]}
									placeholder='Vui lòng chọn Tỉnh/Thành'
								/>
							</Form.Item>
							<Form.Item<DataPayment>
								name='customerDistrict'
								rules={[{ required: true, message: 'Please choose district !' }]}
							>
								<MSelect
									loading={address.loading}
									defaultActiveFirstOption={true}
									onChange={(value) => {
										getServiceDelivery(value);
										form.setFieldValue('customerWard', undefined);
										dispatch(gettingWards(value));
									}}
									options={[...address.districts]}
									placeholder='Vui lòng chọn Quận/Huyện'
								/>
							</Form.Item>
							<Form.Item<DataPayment>
								name='customerWard'
								rules={[{ required: true, message: 'Please choose ward !' }]}
							>
								<MSelect
									defaultActiveFirstOption={true}
									options={[...address.wards]}
									loading={address.loading}
									onChange={() => getFeeOrder(form)}
									placeholder='Vui lòng chọn Phường/Xã'
								/>
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
						md={9}
						xs={24}
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
													src={item.product?.images?.[0]}
													alt='image'
													preview={false}
													height={60}
													width={60}
												/>
											</div>
											<div>
												<MText className='font-medium'>{item?.product?.name}</MText>
												<div>
													{item?.product?.groupOptions?.map((group, index) => (
														<span key={group?.groupName}>
															<span className='text-gray-500'>
																{group?.groupName}: {index === 0 ? item?.productSKU?.option1 + ', ' : item?.productSKU?.option2}
															</span>
														</span>
													))}
												</div>
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
						xs={24}
						md={7}
						className='shadow-md'
					>
						<MTitle
							level={5}
							className='p-2 w-full bg-lime-600 text-base'
							style={{ color: 'white' }}
						>
							3. Thanh Toán
						</MTitle>
						<Form.Item<DataPayment>
							name={'deliveryMethod'}
							label={<span className='px-2'>Loại dịch vụ</span>}
							rules={[{ required: true, message: 'Please choose delivery method !' }]}
						>
							<MSelect
								className='px-2'
								onChange={() => getFeeOrder(form)}
								placeholder='Loại dịch vụ'
								options={services}
							/>
						</Form.Item>
						<div className='p-2 flex flex-col justify-between'>
							<div>
								<h4 className='text-base'>Phương thức thanh toán</h4>
								<Form.Item<DataPayment> name={'paymentMethod'}>
									<Radio.Group
										className='px-2'
										optionType='default'
										options={PAYMENT_METHOD}
									></Radio.Group>
								</Form.Item>
								<div className='flex gap-2 items-center justify-between'>
									<MText className='text-base font-bold'>Voucher</MText>
									<MButton
										type='link'
										className='p-0 text-blue-600'
										onClick={() => dispatch(toggleModal())}
									>
										{voucher.voucherApply ? (
											<div className='flex gap-2'>
												<div className='text-red-500'>-{customMoney(voucher?.voucherApply?.discountValue)}</div>
												Đổi Voucher
											</div>
										) : (
											'Chọn Voucher'
										)}
									</MButton>
								</div>
							</div>
							<div className='w-full text-end p-2'>
								<div className='flex items-center justify-between'>
									<MText className='text-end text-sm'>Tổng tiền hàng</MText>
									<MText className='text-end font-bold text-sm text-red-500'>{customMoney(caculatorTotalPrice(cart.items))}</MText>
								</div>
								<div className='flex items-center justify-between mt-2'>
									<MText className='text-end text-sm'>Phí vận chuyển</MText>
									<MText className='text-end font-bold text-sm text-red-500'>{customMoney(address.fee)}</MText>
								</div>
								{voucher.voucherApply && (
									<div className='flex items-center justify-between mt-2'>
										<MText className='text-end text-sm'>Voucher</MText>
										<MText className='text-end font-bold text-sm text-red-500'>-{customMoney(voucher.voucherApply?.discountValue)}</MText>
									</div>
								)}
								<div className='flex items-center justify-between mt-2'>
									<MText className='text-end text-sm'>Tổng thanh toán</MText>
									<MText className='text-end font-bold text-sm text-red-500'>{customMoney(caculatorTotalPrice(cart.items) + address.fee - (voucher.voucherApply?.discountValue || 0))}</MText>
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
		</>
	);
};

export default PaymentPage;
