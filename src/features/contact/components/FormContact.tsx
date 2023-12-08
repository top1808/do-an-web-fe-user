'use client';
import MButton from '@/components/MButton';
import MInput from '@/components/MInput';
import { Form, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { toast } from 'react-toastify';

type FormContactModel = {
	name: string;
	email: string;
	title: string;
	message: string;
};

const FormContact = () => {
	const [form] = useForm();

	const handleClickSend = (value: FormContactModel) => {
		console.log('🚀 ~ file: FormContact.tsx:16 ~ handleClickSend ~ value:', value);
		toast.success('Gửi thông tin liên hệ thành công.');
		form.setFieldsValue({ name: '', email: '', title: '', message: '' });
	};

	return (
		<Form
			onFinish={handleClickSend}
			autoComplete='off'
			form={form}
		>
			<Form.Item
				name='name'
				labelCol={{ span: 24 }}
				label='Name'
				rules={[{ required: true }]}
			>
				<MInput
					size='large'
					placeholder='Enter name...'
				/>
			</Form.Item>
			<Form.Item
				name='email'
				labelCol={{ span: 24 }}
				label='Email'
				rules={[{ required: true }]}
			>
				<MInput
					size='large'
					placeholder='Enter email...'
				/>
			</Form.Item>
			<Form.Item
				name='title'
				labelCol={{ span: 24 }}
				label='Title'
			>
				<MInput
					size='large'
					placeholder='Enter title...'
				/>
			</Form.Item>
			<Form.Item
				name='message'
				labelCol={{ span: 24 }}
				label='Message'
			>
				<TextArea
					rows={4}
					placeholder='Message'
					size='large'
				/>
			</Form.Item>
			<div className='text-center'>
				<MButton
					type='primary'
					htmlType='submit'
					size='large'
				>
					Send
				</MButton>
			</div>
		</Form>
	);
};

export default FormContact;
