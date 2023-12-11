'use client';
import MButton from '@/components/MButton';
import MTitle from '@/components/MTitle';
import { FormChangePassword } from '@/models/authModel';
import { useAppDispatch } from '@/redux/hooks';
import { changingPassword } from '@/redux/reducers/authReducer';
import { Form, Input } from 'antd';
import React from 'react';

const ChangePass = () => {
	const dispatch = useAppDispatch();
	const onFinish = (value: FormChangePassword) => {
		dispatch(changingPassword(value));
	};

	return (
		<div>
			<MTitle level={3}>Đổi mật khẩu</MTitle>
			<Form onFinish={onFinish}>
				<Form.Item
					name={'password'}
					rules={[{ required: true }]}
					hasFeedback
				>
					<Input.Password placeholder='Nhập mật khẩu hiện tại' />
				</Form.Item>
				<Form.Item
					name={'newPassword'}
					rules={[{ required: true }]}
					hasFeedback
				>
					<Input.Password placeholder='Nhập mật khẩu mới' />
				</Form.Item>
				<Form.Item
					name={'confirmPassword'}
					dependencies={['newPassword']}
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Please confirm your new password!',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('newPassword') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('The new password that you entered do not match!'));
							},
						}),
					]}
				>
					<Input.Password placeholder='Nhập lại mật khẩu mới' />
				</Form.Item>
				<MButton htmlType='submit'>Thay đổi mật khẩu</MButton>
			</Form>
		</div>
	);
};

export default ChangePass;
