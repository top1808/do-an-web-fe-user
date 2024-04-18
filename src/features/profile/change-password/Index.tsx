'use client';
import MButton from '@/components/MButton';
import MTitle from '@/components/MTitle';
import { FormChangePassword } from '@/models/authModel';
import { useAppDispatch } from '@/redux/hooks';
import { changingPassword } from '@/redux/reducers/authReducer';
import { Form, Input } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

const ChangePass = () => {
	const dispatch = useAppDispatch();
	const onFinish = (value: FormChangePassword) => {
		dispatch(changingPassword(value));
	};
	const t = useTranslations('ProfilePage');
	return (
		<div>
			<MTitle level={3}>{t('ChangePassword')}</MTitle>
			<Form onFinish={onFinish}>
				<Form.Item
					name={'password'}
					rules={[{ required: true }]}
					hasFeedback
				>
					<Input.Password placeholder={t('CurrentPassword')} />
				</Form.Item>
				<Form.Item
					name={'newPassword'}
					rules={[{ required: true }]}
					hasFeedback
				>
					<Input.Password placeholder={t('NewPassword')} />
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
					<Input.Password placeholder={t('ConfirmNewPassword')} />
				</Form.Item>
				<MButton htmlType='submit'>{t('SaveChanges')}</MButton>
			</Form>
		</div>
	);
};

export default ChangePass;
