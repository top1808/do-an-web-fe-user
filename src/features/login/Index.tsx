/* eslint-disable react/no-unescaped-entities */
'use client';

import MButton from '@/components/MButton';
import MCheckbox from '@/components/MCheckbox';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import { FormLogin } from '@/models/authModel';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Input } from 'antd';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

type FieldType = {
	email?: string;
	password?: string;
	remember?: string;
	confirmPassword?: string;
	buttonLogin?: string;
};
const UserLogin = () => {
	const accountUser: FormLogin = JSON.parse(localStorage.getItem('accountUser') || '{}');
	const error = useSearchParams().get('error');
	const t = useTranslations('Login');
	const handleClickLogin = (data: FormLogin) => {
		signIn('credentials', {
			email: data.email,
			password: data.password,
		});
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
		}
	}, [error]);

	return (
		<div className='md:w-3/5 xl:w-1/4 w-screen md:bg-white md:py-8 md:px-4 rounded-lg shadow-lg'>
			<h1 className='text-center text-white md:text-black'>{t('Title')}</h1>
			<Form
				name='login'
				initialValues={{ remember: true }}
				onFinish={handleClickLogin}
				onFinishFailed={() => {}}
				autoComplete='off'
				className='m-12'
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
			>
				<Form.Item<FieldType>
					label={<label className='text-white md:text-black'>Email</label>}
					name='email'
					labelAlign='left'
					hasFeedback
					rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item<FieldType>
					label={<label className='text-white md:text-black'>{t('Password')}</label>}
					name='password'
					labelAlign='left'
					hasFeedback
					rules={[
						{ required: true, message: 'Please input your password!' },
						{ min: 6, message: 'Min length password is 6' },
					]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item<FieldType>
					name='remember'
					valuePropName='checked'
					className='text-end'
					wrapperCol={{ md: { offset: 7, span: 17 }, xs: { offset: 7, span: 17 } }}
				>
					<MCheckbox>
						<span className='text-white md:text-black'>{t('RememberMe')}</span>
					</MCheckbox>
				</Form.Item>
				<Form.Item<FieldType> className='flex justify-center'>
					<MButton
						type='primary'
						htmlType='submit'
						size='large'
					>
						{t('ButtonLogin')}
					</MButton>
				</Form.Item>
			</Form>
			<h2 className='text-center text-white md:text-black'>{t('LoginWith')}</h2>
			<MRow
				justify={'center'}
				gutter={12}
				className='mt-5'
			>
				<MCol>
					<MButton
						type='primary'
						shape='circle'
						style={{ width: '3.6rem', height: '3.6rem' }}
						onClick={() => signIn('facebook')}
					>
						<FontAwesomeIcon
							icon={faFacebook}
							color='white'
							className='text-3xl'
						/>
					</MButton>
				</MCol>
				<MCol>
					<MButton
						shape='circle'
						style={{ width: '3.6rem', height: '3.6rem', backgroundColor: 'red' }}
						onClick={() => signIn('google')}
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
				className='mt-12'
				justify={'center'}
			>
				<MCol className='flex flex-col gap-3 items-center'>
					<h2 className='text-white md:text-black'>{t('RecommendedSignUp')}</h2>
					<Link
						href={'/register'}
						className='text-blue-200 md:text-blue-600 font-bold text-xl'
					>
						{t('ButtonSignup')}
					</Link>
				</MCol>
			</MRow>
		</div>
	);
};

export default UserLogin;
