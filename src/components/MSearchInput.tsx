import { Form, InputProps } from 'antd';
import React, { useEffect, useRef } from 'react';
import MInput from './MInput';
import MButton from './MButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
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

	useEffect(() => {
		form.setFieldsValue({ search: search });
	}, [form, search]);

	return (
		<div className='p-1 rounded w-full'>
			<Link
				href={'/search?search=' + searchValue}
				hidden
				ref={linkRef}
			/>
			<Form
				onFinish={() => linkRef?.current?.click()}
				className='w- full flex justify-center gap-2 h-8'
				form={form}
				autoComplete='off'
			>
				<div className='h-full relative'>
					<Form.Item
						name='search'
						label=''
					>
						<MInput
							type='text'
							className='pl-8 pr-8 h-8 text-sm sm:w-60 md:w-60 lg:w-80 xl:w-96 2xl:w-96 '
							placeholder={props.placeHolder}
						/>
					</Form.Item>
					<FontAwesomeIcon
						className={`${searchValue ? 'visible' : 'invisible'} absolute top-2 right-2 leading-8 cursor-pointer`}
						onClick={() => form.resetFields()}
						icon={faXmark}
						size='1x'
					/>
					<FontAwesomeIcon
						color='gray'
						icon={faMagnifyingGlass}
						className='absolute top-2 left-2'
					/>
				</div>
				<MButton
					htmlType='submit'
					type='primary'
					loading={props.loading}
					disabled={!searchValue}
				>
					<FontAwesomeIcon icon={faSearch} />
				</MButton>
			</Form>
		</div>
	);
};
