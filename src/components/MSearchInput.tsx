import { Form, InputProps } from 'antd';
import React, { useEffect, useRef } from 'react';
import MInput from './MInput';
import MButton from './MButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
interface MSearchInputProps extends InputProps {
	onSearch?: ({ search }: { search: string }) => void;
	loading?: boolean;
	placeHolder: string;
}

export const MSearchInput: React.FC<MSearchInputProps> = (props) => {
	const linkRef = useRef<HTMLAnchorElement>(null);

	const [form] = Form.useForm();
	const searchValue = Form.useWatch('search', form);
	const params = useSearchParams();
	const search = params.get('search') || '';
	const handleSearch = () => {
		if (searchValue.length > 0) {
			linkRef?.current?.click();
		}
	};
	useEffect(() => {
		form.setFieldsValue({ search: search });
	}, [form, search]);

	return (
		<div className='p-1 rounded bg-white '>
			<Link
				href={'/search?search=' + searchValue}
				hidden
				ref={linkRef}
			/>
			<Form
				onFinish={handleSearch}
				className='w-full flex justify-center gap-2 h-8'
				form={form}
				autoComplete='off'
			>
				<div className='h-full w-full relative'>
					<Form.Item
						name='search'
						className='w-full'
					>
						<MInput
							type='text'
							className='text-sm w-full pr-8'
							bordered={false}
							placeholder={props.placeHolder}
						/>
					</Form.Item>
					<FontAwesomeIcon
						className={`${searchValue ? 'visible' : 'invisible'} absolute top-2 right-2 leading-8 cursor-pointer`}
						onClick={() => form.resetFields()}
						icon={faXmark}
						size='1x'
					/>
				</div>
				<MButton
					htmlType='submit'
					className='bg-[#FA5130] rounded'
					// loading={props.loading}
				>
					<FontAwesomeIcon
						color='white'
						icon={faSearch}
					/>
				</MButton>
			</Form>
		</div>
	);
};
