'use client';

import MButton from '@/components/MButton';
import MCheckbox from '@/components/MCheckbox';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MTitle from '@/components/MTitle';
import { FormLogin } from '@/models/authModel';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Input } from 'antd';
import { signIn } from 'next-auth/react';
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
		<div className='sm:w-3/4 md:w-3/5 lg:w-2/5 xl:w-1/3 2xl:w-1/4 bg-white py-8 px-4 rounded-lg '>
			<MTitle className='text-center'>Login</MTitle>
			<Form
				name='basic'
				initialValues={{ remember: true }}
				onFinish={handleClickLogin}
				onFinishFailed={() => {}}
				autoComplete='off'
				className='m-12'
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
			>
				<Form.Item<FieldType>
					label='Email'
					name='email'
					labelAlign='left'
					hasFeedback
					rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item<FieldType>
					label='Password'
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
					// label={
					// 	<Link
					// 		href={'/'}
					// 		className='text-blue-600 leading-8'
					// 	>
					// 		Forgot password?
					// 	</Link>
					// }
					className='text-end'
					wrapperCol={{ offset: 7, span: 17 }}
				>
					<MCheckbox>Remember me</MCheckbox>
				</Form.Item>
				<Form.Item<FieldType> className='flex justify-center'>
					<MButton
						type='primary'
						htmlType='submit'
						size='large'
					>
						Log in
					</MButton>
				</Form.Item>
			</Form>
			<MTitle
				level={4}
				className='text-center'
			>
				Or Sign In Using
			</MTitle>
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
					<MTitle level={4}>If You Dont Have Account ?</MTitle>
					<Link
						href={'/register'}
						className='text-blue-600 font-bold text-xl'
					>
						SIGN UP
					</Link>
				</MCol>
			</MRow>
		</div>
	);
};

export default UserLogin;
