import MButton from '@/components/MButton';
import MCheckbox from '@/components/MCheckbox';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MTitle from '@/components/MTitle';
import { FormLogin } from '@/models/authModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { login } from '@/redux/reducers/authReducer';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Input } from 'antd';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

type FieldType = {
	username?: string;
	password?: string;
	remember?: string;
	confirmPassword?: string;
	buttonLogin?: string;
};
const UserLogin = () => {
	const params = useSearchParams();
	const messageError = params.get('error');
	const accountUser: FormLogin = JSON.parse(localStorage.getItem('accountUser') || '{}');
	const dispatch = useAppDispatch();
	const { auth } = useAppSelector((state) => state);
	const handleClickLogin = (data: FormLogin) => {
		dispatch(login(data));
	};
	useEffect(() => {
		if (messageError) {
			toast.error(messageError);
		}
	}, [messageError]);
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
			>
				<Form.Item<FieldType>
					label='Username'
					name='username'
					labelAlign='left'
					rules={[{ required: true, message: 'Please input your username!' }]}
					initialValue={accountUser?.username || ''}
				>
					<Input />
				</Form.Item>

				<Form.Item<FieldType>
					label='Password'
					name='password'
					labelAlign='left'
					rules={[{ required: true, message: 'Please input your password!' }]}
					initialValue={accountUser?.password || ''}
				>
					<Input.Password />
				</Form.Item>
				<div className='flex justify-between'>
					<Form.Item<FieldType>
						name='remember'
						valuePropName='checked'
						className='w-32'
					>
						<MCheckbox className='w-full'>Remember me</MCheckbox>
					</Form.Item>

					<Link
						href={'/'}
						className='text-blue-600 leading-8 h-8'
					>
						Forgot password ?
					</Link>
				</div>

				<Form.Item<FieldType>
					name={'buttonLogin'}
					className='flex justify-center'
				>
					<MButton
						type='primary'
						htmlType='submit'
						size='large'
						loading={auth.logging}
					>
						Log in
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
