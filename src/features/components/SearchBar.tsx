import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MInput from '@/components/MInput';
import MRow from '@/components/MRow';
import MSelect from '@/components/MSelect';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
const SearchBar = () => {
	const [valueSearch, setValueSearch] = useState<string>('');
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const onsubmitSearch = () => {
		valueSearch ? router.push('?keyword=' + valueSearch) : router.push(pathname + '?category=all');
	};
	const handleFillter = (value: string) => {
		router.push(pathname + '?' + createQueryString('fillter', value));
	};
	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);
			value === 'default' ? params.delete('fillter') : params.set(name, value);
			return params.toString();
		},
		[searchParams],
	);
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
						{ value: 'asc', label: 'Giá tăng dần' },
						{ value: 'desc', label: 'Giá giảm dần' },
					]}
				/>
			</MCol>
		</MRow>
	);
};

export default SearchBar;
