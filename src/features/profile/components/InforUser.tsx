'use client';
import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MForm from '@/components/MForm';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import { FormChangeInfor } from '@/models/authModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { changingInfor } from '@/redux/reducers/authReducer';
import { checkPhoneNumber } from '@/utils/FunctionHelpers';
import { Form } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

const InforUser = () => {
	const { auth } = useAppSelector((state) => state);
	const { currentUserInfo } = auth;
	const dispatch = useAppDispatch();
	const t = useTranslations('ProfilePage');
	const onSubmit = (data: FormChangeInfor) => {
		dispatch(changingInfor(data));
	};

	return (
		<Form
			initialValues={{ name: currentUserInfo?.name, email: currentUserInfo?.email, phoneNumber: currentUserInfo?.phoneNumber, address: currentUserInfo?.address, image: currentUserInfo?.image }}
			onFinish={onSubmit}
			labelCol={{ span: 4 }}
			wrapperCol={{ span: 20 }}
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
					<MForm.UploadImage
						formLabel='Avatar'
						formName='image'
						name='image'
						action={`${process.env.API_UPLOAD_URL}image/upload`}
						accept='image/*'
						listType='picture-card'
						initImage={currentUserInfo?.image}
						multiple={false}
						showUploadList={false}
					>
						{t('Upload')}
					</MForm.UploadImage>
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
									rules={[{ type: 'email', message: 'Email is invalid.' }]}
								>
									<MInput
										placeholder='Enter your email'
										required
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
								<Form.Item
									name='phoneNumber'
									label={t('Phone')}
									className='w-full'
									rules={[{ validator: (_, value) => checkPhoneNumber(value) }]}
								>
									<MInput placeholder='Enter your phone number' />
								</Form.Item>
							</MRow>
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
					className='bg-lime-600 hover:bg-lime-500'
					htmlType='submit'
				>
					{t('SaveChanges')}
				</MButton>
			</MRow>
		</Form>
	);
};

export default InforUser;
