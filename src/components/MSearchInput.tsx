import { Form, InputProps } from 'antd';
import React, { useState } from 'react';
import MInput from './MInput';
import MButton from './MButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
interface MSearchInputProps extends InputProps {
	onSearch?: () => void;
}
type FieldType = {
	valuesearch?: string;
	buttonsearch?: string;
};
export const MSearchInput: React.FC<MSearchInputProps> = (props) => {
	const [valueSearch, setValueSearch] = useState('');
	return (
		<div className='p-1 rounded '>
			<Form
				onFinish={props.onSearch}
				className='flex gap-2 h-8'
			>
				<Form.Item<FieldType> className='h-full relative'>
					<MInput
						className='pl-8 pr-8 h-8 text-sm sm:w-60 md:w-60 lg:w-80 xl:w-96 2xl:w-96 '
						placeholder='Search...'
						onChange={(e) => setValueSearch(e.target.value)}
						value={valueSearch}
					/>
					<FontAwesomeIcon
						className={`${valueSearch ? 'visible' : 'invisible'} absolute top-1 right-2 leading-8 cursor-pointer`}
						onClick={() => setValueSearch('')}
						icon={faXmark}
						size='xl'
					/>
					<FontAwesomeIcon
						color='gray'
						icon={faMagnifyingGlass}
						className='absolute top-2 left-2'
					/>
				</Form.Item>
				<MButton
					htmlType='submit'
					type='primary'
				>
					Tìm kiếm
				</MButton>
			</Form>
		</div>
	);
};
