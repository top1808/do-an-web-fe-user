'use client';
import React, { useCallback } from 'react';
import MTitle from './MTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import MRow from './MRow';
import MCol from './MCol';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Menu, Rate } from 'antd';
import MSelect from './MSelect';
import { MenuItem } from '@/models/productModels';
import MButton from './MButton';

const SearchFilter = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const items: MenuItem[] = [
		{
			key: '5',
			label: (
				<Rate
					disabled
					defaultValue={5}
				/>
			),
		},
		{
			key: '4',
			label: (
				<div className='flex gap-4'>
					<Rate
						disabled
						defaultValue={4}
					/>
					<p>& Up</p>
				</div>
			),
		},
		{
			key: '3',
			label: (
				<div className='flex gap-4'>
					<Rate
						disabled
						defaultValue={3}
					/>
					<p>& Up</p>
				</div>
			),
		},
		{
			key: '2',
			label: (
				<div className='flex gap-4'>
					<Rate
						disabled
						defaultValue={2}
					/>
					<p>& Up</p>
				</div>
			),
		},
		{
			key: '1',
			label: (
				<div className='flex gap-4'>
					<Rate
						disabled
						defaultValue={1}
					/>
					<p>& Up</p>
				</div>
			),
		},
	];
	const createQueryString = useCallback(
		(name: string, value?: string) => {
			const params = new URLSearchParams(searchParams.toString());
			if (value) {
				params.set(name, value);
			} else {
				params.delete(name);
			}
			return params.toString();
		},
		[searchParams],
	);
	const clearQueryString = useCallback(() => {
		const params = new URLSearchParams(searchParams.toString());
		const newParams = new URLSearchParams();
		if (params.get('category')) {
			newParams.set('category', params.get('category')!);
		}
		if (params.get('search')) {
			newParams.set('search', params.get('search')!);
		}
		return newParams.toString();
	}, [searchParams]);
	const handleOnChangeFilterPromotion = (value: string, e: CheckboxChangeEvent) => {
		if (e.target.checked) {
			// add query
			router.push(pathname + '?' + createQueryString(value, 'true'));
		} else {
			// remove query
			router.push(pathname + '?' + createQueryString(value, ''));
		}
	};
	return (
		<div className='bg-white shadow-md p-2 rounded-lg'>
			<MTitle level={4}>
				<FontAwesomeIcon
					icon={faFilter}
					className='mr-2'
				/>
				SEARCH FILTER
			</MTitle>
			<MRow
				gutter={[16, 16]}
				className='p-2'
			>
				<MCol span={24}>
					<MRow gutter={[8, 8]}>
						<h3>Promotion</h3>
						<MCol span={24}>
							<Checkbox
								checked={searchParams.get('onSale') === 'true'}
								onChange={(e) => handleOnChangeFilterPromotion('onSale', e)}
							>
								On sale
							</Checkbox>
						</MCol>
						<MCol span={24}>
							<Checkbox
								checked={searchParams.get('freeShip') === 'true'}
								onChange={(e) => handleOnChangeFilterPromotion('freeShip', e)}
							>
								Free ship
							</Checkbox>
						</MCol>
					</MRow>
				</MCol>
				<MCol span={24}>
					<MRow gutter={[8, 8]}>
						<h3>Price</h3>
						<MCol span={24}>
							<MSelect
								value={searchParams.get('priceFilter') ?? 'default'}
								style={{ width: 150 }}
								onChange={(value) => {
									router.push(pathname + '?' + createQueryString('priceFilter', value));
								}}
								options={[
									{ value: 'default', label: '(Default)' },
									{ value: 'asc', label: 'Giá tăng dần' },
									{ value: 'desc', label: 'Giá giảm dần' },
								]}
							/>
						</MCol>
					</MRow>
				</MCol>
				<MCol span={24}>
					<MRow gutter={[8, 8]}>
						<h3>Rating</h3>
						<MCol span={24}>
							<Menu
								onClick={(e) => {
									router.push(pathname + '?' + createQueryString('ratingFilter', e.key));
								}}
								style={{ width: '100%' }}
								mode='inline'
								items={items}
								selectedKeys={searchParams.getAll('ratingFilter') ?? []}
							/>
						</MCol>
					</MRow>
				</MCol>
				<MCol span={24}>
					<MRow>
						<MButton
							type='primary'
							className='w-full text-white bg-red-500 '
							onClick={() => router.push(pathname + '?' + clearQueryString())}
						>
							CLEAR ALL
						</MButton>
					</MRow>
				</MCol>
			</MRow>
		</div>
	);
};
export default SearchFilter;
