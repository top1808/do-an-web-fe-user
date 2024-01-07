'use client';
import authApi from '@/api/authApi';
import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MTitle from '@/components/MTitle';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Input } from 'antd';
import Link from 'next/link';
import { toast } from 'react-toastify';
import React from 'react';

type FieldType = {
	username?: string;
	password?: string;
	email?: string;
	confirmPassword?: string;
};
const UserRegister = () => {
	const handleRegister = async (value: FieldType) => {
		const dataResigter = {
			password: value.password,
			email: value.email,
			name: value.username,
		};
		try {
			const res = await authApi.register(dataResigter);
			toast.success(res.data.message);
			window.location.assign('/login');
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
	};
	return (
		<div className='sm:w-3/4 md:w-3/5 lg:w-2/5 xl:w-1/3 2xl:w-1/3  bg-white py-8 px-0 rounded-lg '>
			<MTitle className='text-center'>SIGN UP</MTitle>
			<Form
				name='basic'
				labelCol={{ span: 9 }}
				wrapperCol={{ span: 15 }}
				initialValues={{ remember: true }}
				onFinish={(value) => handleRegister(value)}
				onFinishFailed={() => {}}
				autoComplete='off'
				className='m-12'
			>
				<Form.Item<FieldType>
					label='Email'
					name='email'
					hasFeedback
					labelAlign='left'
					rules={[{ required: true, type: 'email', message: 'Please input your Email!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item<FieldType>
					label='Password'
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
					label='Confirm Password'
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
						Sign Up
					</MButton>
				</Form.Item>
			</Form>
			<MTitle
				level={4}
				className='text-center'
			>
				Or Sign Up Using
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
					<MTitle level={4}>If You Have Account ?</MTitle>
					<Link
						href={'/login'}
						className='text-blue-600 font-bold text-xl'
					>
						SIGN IN
					</Link>
				</MCol>
			</MRow>
		</div>
	);
};

export default UserRegister;
