'use client';
import authApi from '@/api/authApi';
import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Input } from 'antd';
import Link from 'next/link';
import { toast } from 'react-toastify';
import React from 'react';
import { useTranslations } from 'next-intl';

type FieldType = {
	username?: string;
	password?: string;
	email?: string;
	confirmPassword?: string;
};
const UserRegister = () => {
	const t = useTranslations('SignUp');

	const handleRegister = async (value: FieldType) => {
		const dataResigter = {
			password: value.password,
			email: value.email,
			name: value.username,
		};
		try {
			const res = await authApi.register(dataResigter);
			toast.success(res.data.message);
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
	};
	return (
		<div className='md:w-3/5 xl:w-1/4 w-screen md:bg-white md:py-8 md:px-4 rounded-lg'>
			<h1 className='text-center text-white md:text-black xs:pt-10'>{t('Title')}</h1>
			<Form
				name='resigter'
				labelCol={{ span: 9 }}
				wrapperCol={{ span: 15 }}
				initialValues={{ remember: true }}
				onFinish={(value) => handleRegister(value)}
				onFinishFailed={() => {}}
				autoComplete='off'
				className='m-8 xs:mt-2'
			>
				<Form.Item<FieldType>
					label={<span className='text-white md:text-black'>Email</span>}
					name='email'
					hasFeedback
					labelAlign='left'
					rules={[{ required: true, type: 'email', message: 'Please input your Email!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item<FieldType>
					label={<span className='text-white md:text-black'>{t('Password')}</span>}
					name='password'
					hasFeedback
					labelAlign='left'
					rules={[
						{ required: true, message: 'Please input your password!' },
						{ min: 6, message: 'Min length password is 6' },
					]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item<FieldType>
					label={<span className='text-white md:text-black'>{t('ConfirmPassword')}</span>}
					name='confirmPassword'
					labelAlign='left'
					dependencies={['password']}
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Please input your confirm password!',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('The confirm password that you entered do not match!'));
							},
						}),
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item<FieldType> className='flex justify-center'>
					<MButton
						type='primary'
						htmlType='submit'
						size='large'
					>
						{t('ButtonSignUp')}
					</MButton>
				</Form.Item>
			</Form>
			<h2 className='text-center text-white md:text-black'>{t('SignUpWith')}</h2>
			<MRow
				justify={'center'}
				gutter={12}
				className='mt-5 xs:mt-2'
			>
				{/* <MCol>
					<MButton
						type='primary'
						shape='circle'
						style={{ width: '3.6rem', height: '3.6rem' }}
					>
						<FontAwesomeIcon
							icon={faFacebook}
							color='white'
							className='text-3xl'
						/>
					</MButton>
				</MCol> */}
				<MCol>
					<MButton
						shape='circle'
						style={{ width: '3.6rem', height: '3.6rem', backgroundColor: 'red' }}
					>
						<FontAwesomeIcon
							color='white'
							icon={faGoogle}
							className='text-3xl'
						/>
					</MButton>
				</MCol>
			</MRow>

			<MRow
				className='mt-12 xs:mt-6'
				justify={'center'}
			>
				<MCol className='flex flex-col gap-3 xs:gap-1 items-center'>
					<h2 className='text-white md:text-black'>{t('RecommendedSignIn')}</h2>
					<Link
						href={'/login'}
						className='text-blue-600 font-bold text-xl xs:text-blue-300'
					>
						{t('ButtonSignIn')}
					</Link>
				</MCol>
			</MRow>
		</div>
	);
};

export default UserRegister;
