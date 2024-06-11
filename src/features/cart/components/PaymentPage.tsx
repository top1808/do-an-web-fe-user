'use client';
import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MImage from '@/components/MImage';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import MTitle from '@/components/MTitle';
import { PAYMENT_METHOD } from '@/constant';
import { Address, DataPayment, ParamsGetFeeDelivery, ParamsGetService } from '@/models/paymentModels';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleModal } from '@/redux/reducers/modalReducer';
import { caculatorTotalPriceForCheckout, customMoney, paymentWithVPN } from '@/utils/FunctionHelpers';
import { Form, FormInstance, Radio } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import ModalVoucher from './ModalVoucher';
import { usePathname, useSearchParams } from 'next/navigation';
import MSelect from '@/components/MSelect';
import { clearAddressState, getAddressState, gettingDistricts, gettingFeeDelivery, gettingProvinces, gettingWards } from '@/redux/reducers/addressReducer';
import AddressApi from '@/api/addressApi';
import { DefaultOptionType } from 'antd/es/select';
import { toast } from 'react-toastify';
import { getCartState, paying } from '@/redux/reducers/cartReducer';
import { useTranslations } from 'next-intl';
import { getAuthState } from '@/redux/reducers/authReducer';
import { clearVoucherState, getVoucherState } from '@/redux/reducers/voucherReducer';
import { validateEmail, validatePhoneNumber } from '@/utils/Validator';
import LayoutLoading from '@/components/LayoutLoading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSackDollar } from '@fortawesome/free-solid-svg-icons';

const PaymentPage = () => {
	const cart = useAppSelector(getCartState);
	const auth = useAppSelector(getAuthState);
	const voucher = useAppSelector(getVoucherState);
	const address = useAppSelector(getAddressState);

	const dispatch = useAppDispatch();
	const t = useTranslations('CartPage');
	const [form] = Form.useForm();
	const pathname = usePathname();
	const params = useSearchParams();
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
		if (form.getFieldValue('customerDistrict') && form.getFieldValue('customerWard')) {
			const data: DataPayment = form.getFieldsValue();
			const body: ParamsGetFeeDelivery = {
				from_district_id: 1450,
				from_ward_code: 20805,
				service_id: services[0]?.value as number,
				to_district_id: data?.customerDistrict as number,
				to_ward_code: data?.customerWard as number,
				height: 50,
				length: 20,
				weight: 200,
				width: 20,
				insurance_value: caculatorTotalPriceForCheckout(cart.items),
				cod_failed_amount: 100000,
			};
			dispatch(gettingFeeDelivery(body));
		}
	};

	const handleBack = () => {
		window.history.back();
	};
	const onSubmit = async (data: DataPayment) => {
		const dataPost: DataPayment = {
			...data,
			products: cart.items?.map((p) => ({
				cartId: p._id,
				productSKUBarcode: p?.productSKUBarcode || '',
				productName: p.product?.name || '',
				productCode: p.product?._id || '',
				quantity: p.quantity || 0,
				price: p.price || 0,
				totalPrice: p.totalPrice || 0,
				note: '',
				options: p?.productSKU?.options || [],
			})),
			deliveryFee: address.fee,
			totalProductPrice: caculatorTotalPriceForCheckout(cart.items),
			totalPaid: 0,
			totalPrice: caculatorTotalPriceForCheckout(cart.items) + address.fee,
			voucher: voucher.voucherApply,
			customerDistrict: {
				value: data?.customerDistrict as number,
				label: address.districts?.find((d: Address) => d.value === data.customerDistrict)?.label || '',
			},
			customerProvince: {
				value: data?.customerProvince as number,
				label: address.provinces?.find((d: Address) => d.value === data.customerProvince)?.label || '',
			},
			customerWard: {
				value: data?.customerWard as number,
				label: address.wards?.find((d: Address) => d.value === data.customerWard)?.label || '',
			},
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
				returnURL: `http://localhost:3000${pathname}`,
			};
			localStorage.setItem('tempDataPayement', JSON.stringify(dataPost));
			paymentWithVPN({ ...data });
		} else {
			dispatch(paying(dataPost));
		}
	};
	useEffect(() => {
		form.setFieldsValue({
			customerName: auth.currentUserInfo?.name || form.getFieldValue('customerName') || '',
			customerPhone: auth.currentUserInfo?.phoneNumber || form.getFieldValue('customerPhone') || '',
			customerEmail: auth.currentUserInfo?.email || form.getFieldValue('customerEmail') || '',
			deliveryAddress: auth.currentUserInfo?.address || form.getFieldValue('deliveryAddress') || '',
			note: form.getFieldValue('note') || '',
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
				window.location.assign('/');
			});
		} else if (cart.payingStatus === 'failed') {
			Swal.fire({
				title: 'Thanh toán thất bại',
				text: 'Có lỗi xảy ra trong quá trình thanh toán',
				icon: 'error',
				confirmButtonText: 'Ẩn',
			});
		}
	}, [cart.items, cart.orderInfo, cart.payingStatus, dispatch]);
	useEffect(() => {
		dispatch(clearAddressState());
		dispatch(clearVoucherState());
		// get IP customer
		// axios.get('https://api.ipify.org/').then((res) => dispatch(setIPCustomer(res.data)));
		if (params.get('vnp_ResponseCode')) {
			const isSuccess = params.get('vnp_ResponseCode') === '00' ? true : false;
			if (isSuccess) {
				const dataPayment = localStorage.getItem('tempDataPayement');
				const data = JSON.parse(dataPayment!);
				const totalPaid = Number(params.get('vnp_Amount') || 0) / 100;
				dispatch(paying({ ...data, totalPaid: totalPaid }));
			} else {
				localStorage.removeItem('tempDataPayement');
				toast.error('Payment failed');
			}
		} else {
			localStorage.removeItem('tempDataPayement');
		}
	}, [dispatch, params]);
	return (
		<>
			<div className='relative'>
				<MButton
					className='absolute top-4 px-4'
					type='primary'
					onClick={handleBack}
				>
					<FontAwesomeIcon icon={faArrowLeft} />
					&nbsp; Back
				</MButton>
				<h2 className='text-center text-3xl font-semibold py-4 '>
					<FontAwesomeIcon
						icon={faSackDollar}
						color='green'
					/>
					&nbsp; Checkout
				</h2>
			</div>
			<LayoutLoading isLoading={false}>
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
							className='shadow-md bg-white'
						>
							<MTitle
								level={5}
								className='p-2 w-full bg-lime-600 text-base'
								style={{ color: 'white' }}
							>
								{`1. ${t('DeliverAddress')}`}
							</MTitle>
							<div className='p-4'>
								<Form.Item<DataPayment>
									name={'customerName'}
									rules={[{ required: true, message: 'Please input your name!' }]}
								>
									<MInput placeholder={t('Name')} />
								</Form.Item>
								<Form.Item<DataPayment>
									name={'customerPhone'}
									rules={[{ required: true, message: 'Please input your phone!' }, { validator: validatePhoneNumber }]}
								>
									<MInput placeholder={t('PhoneNumber')} />
								</Form.Item>
								<Form.Item<DataPayment>
									name='customerEmail'
									rules={[{ required: true, message: 'Please input your mail !' }, { validator: validateEmail }]}
								>
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
										options={address.provinces}
										placeholder={t('YourCity')}
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
										options={address.districts}
										placeholder={t('YourDistrict')}
									/>
								</Form.Item>
								<Form.Item<DataPayment>
									name='customerWard'
									rules={[{ required: true, message: 'Please choose ward !' }]}
								>
									<MSelect
										defaultActiveFirstOption={true}
										options={address.wards}
										loading={address.loading}
										onChange={() => getFeeOrder(form)}
										placeholder={t('YourWard')}
									/>
								</Form.Item>
								<Form.Item<DataPayment>
									name={'deliveryAddress'}
									rules={[{ required: true, message: 'Please input your address!' }]}
								>
									<MInput placeholder={t('DetailAddress')} />
								</Form.Item>
								<Form.Item<DataPayment> name='note'>
									<TextArea placeholder={t('Note')} />
								</Form.Item>
							</div>
						</MCol>
						<MCol
							md={9}
							xs={24}
							className='flex flex-col justify-between shadow-md bg-white'
						>
							<div>
								<MTitle
									level={5}
									className='p-2 w-full bg-lime-600 text-base'
									style={{ color: 'white' }}
								>
									{`2. ${t('Product')}`}
								</MTitle>
								<div style={{ height: '30rem', overflow: 'auto' }}>
									{cart.items?.map((item) => {
										if (item.isChecked) {
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
																		{group?.groupName}: {index === 0 ? item?.productSKU?.options?.[0].option + ', ' : item?.productSKU?.options?.[1].option}
																	</span>
																</span>
															))}
														</div>
														<div className='flex gap-4'>
															<MText className='font-medium'>{`${t('ColumnQuantityProduct')}: ${item.quantity}`}</MText>
															<MText className='font-medium'>{`${t('ColumnPriceProduct')}: ${customMoney(item?.totalPrice || 0)}`}</MText>
														</div>
													</div>
												</div>
											);
										}
									})}
								</div>
							</div>
						</MCol>
						<MCol
							xs={24}
							md={7}
							className='shadow-md bg-white'
						>
							<MTitle
								level={5}
								className='p-2 w-full bg-lime-600 text-base'
								style={{ color: 'white' }}
							>
								{`3. ${t('Payment')}`}
							</MTitle>
							{/* <Form.Item<DataPayment>
								name={'deliveryMethod'}
								label={<span className='px-2'>{t('TypeService')}</span>}
								rules={[{ required: true, message: 'Please choose delivery method !' }]}
							>
								<MSelect
									className='px-2'
									onChange={() => getFeeOrder(form)}
									placeholder={t('TypeService')}
									options={services}
								/>
							</Form.Item> */}
							<div className='p-2 flex flex-col justify-between'>
								<div>
									<h4 className='text-base'>{t('PaymentMethod')}</h4>
									<Form.Item<DataPayment> name={'paymentMethod'}>
										<Radio.Group
											className='px-2'
											optionType='default'
											options={[
												...PAYMENT_METHOD.map(({ label, value }) => ({
													label: t(label),
													value: value,
												})),
											]}
										/>
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
													{t('ChooseVoucher')}
												</div>
											) : (
												t('ChooseVoucher')
											)}
										</MButton>
									</div>
								</div>
								<div className='w-full text-end p-2'>
									<div className='flex items-center justify-between'>
										<MText className='text-end text-sm'>{t('TotalPrice')}</MText>
										<MText className='text-end font-bold text-sm text-red-500'>{customMoney(caculatorTotalPriceForCheckout(cart.items))}</MText>
									</div>
									<div className='flex items-center justify-between mt-2'>
										<MText className='text-end text-sm'>{t('DeliveryFee')}</MText>
										<MText className='text-end font-bold text-sm text-red-500'>{customMoney(address.fee)}</MText>
									</div>
									{voucher.voucherApply && (
										<div className='flex items-center justify-between mt-2'>
											<MText className='text-end text-sm'>Voucher</MText>
											<MText className='text-end font-bold text-sm text-red-500'>-{customMoney(voucher.voucherApply?.discountValue)}</MText>
										</div>
									)}
									<div className='flex items-center justify-between mt-2'>
										<MText className='text-end text-sm'>{t('TotalPaid')}</MText>
										<MText className='text-end font-bold text-sm text-red-500'>
											{customMoney(caculatorTotalPriceForCheckout(cart.items) + address.fee - (voucher.voucherApply?.discountValue || 0))}
										</MText>
									</div>
									<MButton
										className='mt-2'
										htmlType='submit'
										type='primary'
										disabled={address?.fee <= 0}
									>
										{t('PlaceOrder')}
									</MButton>
								</div>
							</div>
						</MCol>
					</MRow>
				</Form>
			</LayoutLoading>
		</>
	);
};
export default PaymentPage;
