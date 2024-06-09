import React, { useEffect, useState } from 'react';
import { Form, Upload, UploadProps, Image } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
interface MUploadImageProps extends UploadProps {
	image?: string;
	formName?: string;
	disableTitle?: boolean;
	notRequired?: boolean;
}

const MUploadImage: React.FC<MUploadImageProps> = ({ image, formName, disableTitle, notRequired, ...rest }) => {
	const [imageLocal, setImageLocal] = useState<string>('');
	const [loading, setLoading] = useState(false);
	const handleChange: UploadProps['onChange'] = (info) => {
		if (info.file.status === 'uploading') {
			setLoading(true);
			return;
		}
		if (info.file.status === 'done') {
			setLoading(false);
			setImageLocal(info.file?.response?.image);
		}
	};

	const getFile = (e: UploadProps) => {
		if (Array.isArray(e)) {
			return e;
		}
		return e && e?.fileList?.[e?.fileList?.length - 1 || 0]?.response?.image;
	};

	useEffect(() => {
		setImageLocal(image || '');
	}, [image]);

	return (
		<Form.Item
			label={disableTitle ? '' : 'Image'}
			name={formName || 'imageUpload'}
			getValueFromEvent={getFile}
			rules={[
				{
					required: !notRequired,
					message: 'Image is required',
				},
			]}
		>
			<Upload
				name='image'
				listType='picture-card'
				className='avatar-uploader'
				showUploadList={false}
				action={`${process.env.API_UPLOAD_URL}cloudinary-upload`}
				onChange={handleChange}
				accept='image/*'
				{...rest}
			>
				{!loading && imageLocal ? (
					<Image
						src={imageLocal}
						alt='avatar'
						style={{ width: '100%' }}
						preview={false}
					/>
				) : (
					<button
						style={{ border: 0, background: 'none' }}
						type='button'
					>
						{loading ? <LoadingOutlined /> : <PlusOutlined />}
						<div style={{ marginTop: 8 }}>Upload</div>
					</button>
				)}
			</Upload>
		</Form.Item>
	);
};

export default MUploadImage;
