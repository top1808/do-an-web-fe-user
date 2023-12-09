import React, { ReactNode, useEffect, useState } from 'react';
import { Form, FormProps, FormItemProps, UploadProps } from 'antd';
import MUpload from './MUpload';
import MImage from './MImage';

interface MFormProps extends FormProps {
	children?: ReactNode;
}

interface MFormItemProps extends FormItemProps {
	children?: ReactNode;
}

interface MFormUploadImageProps extends UploadProps {
	children?: ReactNode;
	formLabel?: string;
	formName?: string;
	initImage?: string;
}

const MForm1: React.FC<MFormProps> = (props) => {
	const { children, ...rest } = props;
	return <Form {...rest}>{children}</Form>;
};

const MFormItem: React.FC<MFormItemProps> = (props) => {
	const { children, ...rest } = props;
	return <Form.Item {...rest}>{children}</Form.Item>;
};

const MFormUploadImage: React.FC<MFormUploadImageProps> = (props) => {
	const { children, formLabel, formName, initImage, ...rest } = props;
	const [image, setImage] = useState('');

	const normFile = (e: any) => {
		if (Array.isArray(e)) {
			return e;
		}
		return e?.file?.response?.image?.data;
	};

	useEffect(() => {
		setImage(initImage || '');
	}, [initImage]);

	return (
		<div className='flex flex-col items-center'>
			<div className='font-bold text-2xl mb-2'>{formLabel}</div>

			<Form.Item
				name={formName}
				valuePropName='file'
				getValueFromEvent={normFile}
			>
				<MUpload
					{...rest}
					onChange={(e) => setImage(e?.file?.response?.image?.data)}
				>
					{image ? (
						<MImage
							src={image}
							alt='avatar'
							preview={false}
							style={{ width: '100%', height: '100%' }}
						/>
					) : (
						children
					)}
				</MUpload>
			</Form.Item>
		</div>
	);
};

const MForm = { Form: MForm1, Item: MFormItem, UploadImage: MFormUploadImage };

export default MForm;
