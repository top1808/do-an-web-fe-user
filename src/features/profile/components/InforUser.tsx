'use client';
import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import MSelect from '@/components/MSelect';
import MUploadImage from '@/components/MUploadImage';
import { FormChangeInfor } from '@/models/authModel';
import { Address } from '@/models/paymentModels';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getAddressState, gettingDistricts, gettingProvinces, gettingWards } from '@/redux/reducers/addressReducer';
import { changingInfor, getAuthState } from '@/redux/reducers/authReducer';
import { checkPhoneNumber } from '@/utils/FunctionHelpers';
import { Form } from 'antd';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';

const InforUser = () => {
	const auth = useAppSelector(getAuthState);
	const address = useAppSelector(getAddressState);
	const { currentUserInfo } = auth;
	const dispatch = useAppDispatch();
	const t = useTranslations('ProfilePage');
	const [form] = Form.useForm();
	const onSubmit = (data: any) => {
		const body: FormChangeInfor = {
			...data,
			province: {
				value: data?.userProvince as number,
				label: address.provinces?.find((d: Address) => d.value === data.userProvince)?.label || '',
			},
			district: {
				value: data?.userDistrict as number,
				label: address.districts?.find((d: Address) => d.value === data.userDistrict)?.label || '',
			},
			ward: {
				value: data?.userWard as number,
				label: address.wards?.find((d: Address) => d.value === data.userWard)?.label || '',
			},
		};
		// console.log(body);

		dispatch(changingInfor(body));
	};
	useEffect(() => {
		dispatch(gettingProvinces());
	}, [dispatch]);
	useEffect(() => {
		form.setFieldsValue({
			userProvince: currentUserInfo?.userProvince?.value || currentUserInfo?.province?.value,
			// userDistrict: currentUserInfo?.userDistrict?.value || currentUserInfo?.district?.value,
			// userWard: currentUserInfo?.userWard?.value || currentUserInfo?.ward?.value,
			name: currentUserInfo?.name,
			email: currentUserInfo?.email,
			phoneNumber: currentUserInfo?.phoneNumber,
			address: currentUserInfo?.address,
			image: currentUserInfo?.image,
		});
		// const setAddress = async () => {
		// 	if (currentUserInfo?.province) {
		// 		await dispatch(gettingDistricts(currentUserInfo?.province?.value as string));
		// 		if (currentUserInfo?.district) {
		// 			await dispatch(gettingWards(currentUserInfo?.district?.value as string));
		// 		}
		// 	}
		// }
		// setAddress();
	}, [dispatch, currentUserInfo, form]);

	return (
		<Form
			onFinish={onSubmit}
			labelCol={{ span: 4 }}
			wrapperCol={{ span: 20 }}
			form={form}
		>
			<h2 className='text-center'>{t('Account')}</h2>
			<MRow
				gutter={8}
				className='mt-2'
			>
				<MCol
					xs={24}
					md={6}
				>
					<MUploadImage
						image={currentUserInfo?.image || ''}
						formName='image'
						disableTitle
						notRequired
					/>
				</MCol>
				<MCol
					xs={24}
					md={18}
				>
					<MRow gutter={8}>
						<MCol span={24}>
							<MRow
								justify={'start'}
								align={'middle'}
								className='font-bold mb-2'
							>
								<MCol
									span={4}
									className='text-end'
								>
									ID: &nbsp;
								</MCol>
								<MCol
									span={20}
									className='text-blue-600'
								>
									{currentUserInfo?.id}
								</MCol>
							</MRow>
							<MRow
								justify={'start'}
								align={'middle'}
								className='font-bold'
							>
								<Form.Item
									name='email'
									label='Email'
									className='w-full'
									// rules={[{ type: 'email', message: 'Email is invalid.' }]}
								>
									<MInput
										placeholder='Enter your email'
										disabled
									/>
								</Form.Item>
							</MRow>
							<MRow
								justify={'start'}
								align={'middle'}
								className='font-bold'
							>
								<Form.Item
									name='name'
									label={t('Name')}
									className='w-full'
								>
									<MInput
										placeholder='Enter your name'
										required
									/>
								</Form.Item>
							</MRow>
							<MRow
								justify={'start'}
								align={'middle'}
								className='font-bold'
							>
								<Form.Item<FormChangeInfor>
									name='phoneNumber'
									label={t('Phone')}
									className='w-full'
									rules={[{ validator: (_, value) => checkPhoneNumber(value) }]}
								>
									<MInput placeholder='Enter your phone number' />
								</Form.Item>
							</MRow>
							{/* <MRow justify={'end'}>
								<MCol
									span={7}
									className='flex justify-end'
								>
									<Form.Item
										name='userProvince'
										rules={[{ required: true, message: 'Please choose province !' }]}
										className='w-full'
									>
										<MSelect
											loading={address.loading}
											showSearch={true}
											optionFilterProp='label'
											onChange={(value) => {
												form.setFieldValue('customerDistrict', undefined);
												form.setFieldValue('customerWard', undefined);
												form.setFieldValue('deliveryMethod', undefined);
												dispatch(gettingDistricts(value));
											}}
											options={address.provinces || [currentUserInfo?.userProvince]}
											placeholder={t('Province')}
										/>
									</Form.Item>
								</MCol>
								<MCol span={7}>
									<Form.Item
										name='userDistrict'
										rules={[{ required: true, message: 'Please choose district !' }]}
									>
										<MSelect
											className='flex justify-end'
											loading={address.loading}
											showSearch={true}
											optionFilterProp='label'
											defaultActiveFirstOption={true}
											disabled={address?.districts?.length > 1 ? false : true}
											onChange={(value) => {
												form.setFieldValue('userWard', undefined);
												dispatch(gettingWards(value));
											}}
											options={address.districts || [currentUserInfo?.userDistrict]}
											placeholder={t('District')}
										/>
									</Form.Item>
								</MCol>
								<MCol span={7}>
									<Form.Item
										name='userWard'
										rules={[{ required: true, message: 'Please choose ward !' }]}
									>
										<MSelect
											showSearch={true}
											optionFilterProp='label'
											disabled={address?.wards?.length > 1 ? false : true}
											defaultActiveFirstOption={true}
											options={address.wards || [currentUserInfo?.userWard]}
											placeholder={t('Ward')}
										/>
									</Form.Item>
								</MCol>
							</MRow> */}
							<MRow
								justify={'start'}
								align={'middle'}
								className='font-bold'
							>
								<Form.Item
									name='address'
									label={t('Address')}
									className='w-full'
								>
									<MInput placeholder='Enter your address' />
								</Form.Item>
							</MRow>
						</MCol>
					</MRow>
				</MCol>
			</MRow>
			<MRow className='flex justify-center'>
				<MButton
					type='primary'
					className='bg-orange-600 hover:bg-orange-500'
					htmlType='submit'
				>
					{t('SaveChanges')}
				</MButton>
			</MRow>
		</Form>
	);
};

export default InforUser;
