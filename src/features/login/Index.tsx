/* eslint-disable react/no-unescaped-entities */
'use client';

import MButton from '@/components/MButton';
import MCheckbox from '@/components/MCheckbox';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import { FormLogin } from '@/models/authModel';
import { Form, Input } from 'antd';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type FieldType = {
	email?: string;
	password?: string;
	remember?: string;
	confirmPassword?: string;
	buttonLogin?: string;
};
const UserLogin = () => {
	const accountUser: FormLogin = JSON.parse(localStorage.getItem('accountUserSale') || '{}');
	const [loading, setLoading] = useState(false);
	const error = useSearchParams().get('error');
	const t = useTranslations('Login');
	const handleClickLogin = async (data: FormLogin) => {
		localStorage.setItem('accountUserSale', JSON.stringify(data));
		setLoading(true);
		await signIn('credentials', {
			email: data.email,
			password: data.password,
		});
		setLoading(false);
	};

	useEffect(() => {
		if (error) {
			toast.error(t(error));
		}
	}, [error, t]);

	return (
		<div className='w-full xl:w-1/4 rounded-lg shadow-lg bg-white py-4'>
			<h1 className='text-center text-black'>{t('Title')}</h1>
			<Form
				name='login'
				initialValues={{ remember: true, email: accountUser.email, password: accountUser.password }}
				onFinish={handleClickLogin}
				onFinishFailed={() => {}}
				autoComplete='off'
				className='px-8 py-1 xl:py-4 w-full'
				layout='vertical'
			>
				<Form.Item<FieldType>
					name='email'
					label={t('Email')}
					hasFeedback
					rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
				>
					<Input
						placeholder='Email'
						className='py-2 px-4'
					/>
				</Form.Item>
				<Form.Item<FieldType>
					name='password'
					label={t('Password')}
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
					name='remember'
					valuePropName='checked'
					className='text-end'
					wrapperCol={{ md: { offset: 7, span: 17 }, xs: { offset: 7, span: 17 } }}
				>
					<MCheckbox>
						<span className='text-black'>{t('RememberMe')}</span>
					</MCheckbox>
				</Form.Item>

				<MButton
					className='bg-orange-600 text-white'
					htmlType='submit'
					style={{ width: '100%' }}
					size='large'
					loading={loading}
				>
					{t('ButtonLogin')}
				</MButton>
			</Form>
			<div className='flex w-full justify-between items-center px-2'>
				<div className='bg-gray-200 h-[2px] w-1/5'></div>
				<MText className='text-center text-xl font-bold text-gray-400'>{t('LoginWith')}</MText>
				<div className='bg-gray-200 h-[2px] w-1/5'></div>
			</div>
			<div className='w-full px-8 py-4'>
				<MButton
					onClick={async () => {
						setLoading(true);
						await signIn('google');
						setLoading(false);
					}}
					style={{ height: '3rem' }}
					className='text-2xl w-full bg-white'
					loading={loading}
				>
					<span className='font-bold text-blue-600'>G</span>
					<span className='font-bold text-red-500'>o</span>
					<span className='font-bold text-yellow-500'>o</span>
					<span className='font-bold text-blue-500'>g</span>
					<span className='font-bold text-green-500'>l</span>
					<span className='font-bold text-red-500'>e</span>
				</MButton>
			</div>
			<MRow
				className='mt-8'
				justify={'center'}
			>
				<MCol className='flex flex-col gap-3 items-center'>
					<Link
						href={'/register'}
						className='text-blue-600 font-bold text-xl'
					>
						<span className='text-gray-400'>{t('RecommendedSignUp')}</span> {t('ButtonSignup')}
					</Link>
				</MCol>
			</MRow>
		</div>
	);
};

export default UserLogin;
