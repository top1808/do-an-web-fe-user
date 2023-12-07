'use client';
import MButton from '@/components/MButton';
import MInput from '@/components/MInput';
import { Form, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';

type FieldType = {
	name: string;
	email: string;
	title: string;
	message: string;
};
const FormContact = () => {
	const handleClickSend = () => {};
	return (
		<Form
			name='form-contact'
			initialValues={{ name: '', email: '', title: '', message: '' }}
			onFinish={handleClickSend}
			onFinishFailed={() => {}}
			autoComplete='off'
		>
			<Form.Item<FieldType>
				name='name'
				labelCol={{ span: 24 }}
				label='Name'
			>
				<MInput className='px-4 py-2' />
			</Form.Item>
			<Form.Item<FieldType>
				name='email'
				labelCol={{ span: 24 }}
				label='Email'
			>
				<MInput className='px-4 py-2' />
			</Form.Item>
			<Form.Item<FieldType>
				name='title'
				labelCol={{ span: 24 }}
				label='Title'
			>
				<MInput className='px-4 py-2' />
			</Form.Item>
			<Form.Item<FieldType>
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
			<Form.Item>
				<Space>
					<MButton
						type='primary'
						htmlType='submit'
						size='large'
					>
						Send
					</MButton>
				</Space>
			</Form.Item>
		</Form>
	);
};

export default FormContact;
