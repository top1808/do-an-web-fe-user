import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import MSelect from '@/components/MSelect';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form } from 'antd';
import { useState } from 'react';
const SearchBar = () => {
	const [valueSearch, setValueSearch] = useState<string>('');
	const onsubmitSearch = () => {
		//call api search
		console.log(valueSearch);
	};
	const handleFillter = (value: string) => {
		//call api fillter
		console.log(value);
	};
	return (
		<MRow>
			<MCol span={12}>
				<Form onFinish={onsubmitSearch}>
					<div className='relative'>
						<MInput
							className='py-2 pl-4 pr-16 h-full'
							placeholder='Search.....'
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								setValueSearch(e.target.value);
							}}
						/>
						<MButton
							type='primary'
							className='absolute h-full right-0 top'
							htmlType='submit'
						>
							<FontAwesomeIcon
								size='xl'
								icon={faMagnifyingGlass}
							/>
						</MButton>
					</div>
				</Form>
			</MCol>
			<MCol
				span={12}
				className='flex justify-end'
			>
				<MSelect
					defaultValue='default'
					style={{ width: 150 }}
					onChange={handleFillter}
					options={[
						{ value: 'default', label: '(Default)' },
						{ value: 'increase', label: 'Giá tăng dần' },
						{ value: 'decrease', label: 'Giá giảm dần' },
						{ value: 'A-Z', label: 'Tên theo A-Z' },
						{ value: 'Z-A', label: 'Tên theo Z-A' },
					]}
				/>
			</MCol>
		</MRow>
	);
};

export default SearchBar;
