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
import MText from '@/components/MText';

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
			<h1 className='text-center text-black xs:pt-10'>{t('Title')}</h1>
			<Form
				name='resigter'
				initialValues={{ remember: true }}
				onFinish={(value) => handleRegister(value)}
				onFinishFailed={() => {}}
				autoComplete='off'
				className='px-8 py-1 xl:py-4 w-full'
			>
				<Form.Item<FieldType>
					name='email'
					hasFeedback
					rules={[{ required: true, type: 'email', message: 'Please input your Email!' }]}
				>
					<Input
						placeholder='Email'
						className='py-2 px-4'
					/>
				</Form.Item>

				<Form.Item<FieldType>
					name='password'
					hasFeedback
					rules={[
						{ required: true, message: 'Please input your password!' },
						{ min: 6, message: 'Min length password is 6' },
					]}
				>
					<Input.Password
						placeholder='Password'
						className='py-2 px-4'
					/>
				</Form.Item>
				<Form.Item<FieldType>
					name='confirmPassword'
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
					<Input.Password
						placeholder='Confirm Password'
						className='py-2 px-4'
					/>
				</Form.Item>

				<Form.Item<FieldType> className='flex justify-center'>
					<MButton
						className='bg-orange-600 text-white'
						htmlType='submit'
						style={{ width: '100%' }}
						size='large'
					>
						{t('ButtonSignUp')}
					</MButton>
				</Form.Item>
			</Form>
			<div className='flex w-full justify-between items-center px-2'>
				<div className='bg-gray-200 h-[2px] w-1/6'></div>
				<MText className='text-center text-xl font-bold text-gray-400'>{t('SignUpWith')}</MText>
				<div className='bg-gray-200 h-[2px] w-1/6'></div>
			</div>
			<MRow
				justify={'center'}
				gutter={12}
				className='mt-5 xs:mt-2'
			>
				<MCol>
					<MButton
						style={{ height: '3rem' }}
						className='text-2xl w-full bg-white '
					>
						<p>
							<span className='font-bold text-blue-600'>G</span>
							<span className='font-bold text-red-500'>o</span>
							<span className='font-bold text-yellow-500'>o</span>
							<span className='font-bold text-blue-500'>g</span>
							<span className='font-bold text-green-500'>l</span>
							<span className='font-bold text-red-500'>e</span>
						</p>
					</MButton>
				</MCol>
			</MRow>

			<MRow
				className='mt-12 xs:mt-6'
				justify={'center'}
			>
				<MCol className='flex flex-col gap-3 xs:gap-1 items-center'>
					<h2 className='text-black'>{t('RecommendedSignIn')}</h2>
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
