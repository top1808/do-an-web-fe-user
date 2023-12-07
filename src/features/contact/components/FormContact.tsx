'use client';
import MButton from '@/components/MButton';
import MInput from '@/components/MInput';
import { Form, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';

type FormContactModel = {
	name: string;
	email: string;
	title: string;
	message: string;
};

const FormContact = () => {
	const handleClickSend = (value: FormContactModel) => {
		console.log('🚀 ~ file: FormContact.tsx:16 ~ handleClickSend ~ value:', value);
	};

	return (
		<Form
			onFinish={handleClickSend}
			initialValues={{ name: '', email: '', title: '', message: '' }}
			autoComplete='off'
		>
			<Form.Item
				name='name'
				labelCol={{ span: 24 }}
				label='Name'
				rules={[{ required: true }]}
			>
				<MInput className='px-4 py-2' />
			</Form.Item>
			<Form.Item
				name='email'
				labelCol={{ span: 24 }}
				label='Email'
				rules={[{ required: true }]}
			>
				<MInput className='px-4 py-2' />
			</Form.Item>
			<Form.Item
				name='title'
				labelCol={{ span: 24 }}
				label='Title'
			>
				<MInput className='px-4 py-2' />
			</Form.Item>
			<Form.Item
				name='message'
				labelCol={{ span: 24 }}
				label='Message'
			>
				<TextArea
					rows={4}
					placeholder='Message'
					className='px-4 py-2'
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
